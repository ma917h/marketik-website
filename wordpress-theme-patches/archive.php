<?php
/**
 * アーカイブ（カテゴリー／タグ／著者／日付／カスタム投稿タイプ）
 *
 * 旧版は wp_pagenavi() だけを呼んでいたが、WP-PageNavi プラグインが
 * 入っていないため Call to undefined function で HTTP 500 になっていた。
 * さらにループが無く、記事一覧としても機能していなかった。
 * home.php と同じマークアップに揃え、ページ送りはコア関数を使う。
 */
get_header();

// archive.php と index.php の両方に同じ内容を置いているため、
// どちらが読まれても二重定義にならないようガードする。
if ( ! function_exists( 'marketik_archive_card_image' ) ) :

	/**
	 * カードに出す画像を決める。
	 *
	 * メンバー等のCPTは顔写真をアイキャッチではなくACFの画像フィールドに
	 * 持っているため、アイキャッチだけを見るとロゴのプレースホルダに
	 * 化けてしまう。次の順で探す。
	 *   1. アイキャッチ
	 *   2. ACFの画像フィールド（フィールド名に依存しない）
	 *   3. 投稿に添付された画像
	 *   4. プレースホルダ
	 *
	 * @param int    $post_id     対象の投稿ID
	 * @param string $placeholder 全て見つからなかったときのURL
	 * @return string 画像URL
	 */
	function marketik_archive_card_image( $post_id, $placeholder ) {

		// 1. アイキャッチ
		$url = get_the_post_thumbnail_url( $post_id, 'large' );
		if ( $url ) {
			return $url;
		}

		// 2. ACFの画像フィールド
		if ( function_exists( 'get_fields' ) ) {
			$fields = get_fields( $post_id );
			if ( is_array( $fields ) ) {
				foreach ( $fields as $value ) {
					$url = marketik_image_url_from_value( $value );
					if ( $url ) {
						return $url;
					}
				}
			}
		}

		// 3. 投稿に添付された画像の1枚目
		$attached = get_attached_media( 'image', $post_id );
		if ( ! empty( $attached ) ) {
			$first = array_shift( $attached );
			$url   = wp_get_attachment_image_url( $first->ID, 'large' );
			if ( $url ) {
				return $url;
			}
		}

		// 4. プレースホルダ
		return $placeholder;
	}

	/**
	 * ACFのフィールド値から画像URLを取り出す。
	 * 返り値の形式（配列／ID／URL）が設定によって変わるため3通りを見る。
	 * リンクフィールドも 'url' を持つので、画像かどうかを mime_type で判定する。
	 *
	 * @param mixed $value ACFフィールドの値
	 * @return string 画像URLまたは空文字
	 */
	function marketik_image_url_from_value( $value ) {

		// 返り値「配列」形式
		if ( is_array( $value ) ) {
			$is_image = ( ! empty( $value['mime_type'] ) && 0 === strpos( $value['mime_type'], 'image/' ) )
				|| ! empty( $value['sizes'] );
			if ( $is_image && ! empty( $value['url'] ) ) {
				return $value['url'];
			}
			// ギャラリー等、画像の配列だった場合は先頭を見る
			if ( ! empty( $value[0] ) ) {
				return marketik_image_url_from_value( $value[0] );
			}
			return '';
		}

		// 返り値「ID」形式
		if ( is_numeric( $value ) && (int) $value > 0 && wp_attachment_is_image( (int) $value ) ) {
			return (string) wp_get_attachment_image_url( (int) $value, 'large' );
		}

		// 返り値「URL」形式
		if ( is_string( $value ) && preg_match( '#^https?://.+\.(jpe?g|png|gif|webp|avif)(\?.*)?$#i', $value ) ) {
			return $value;
		}

		return '';
	}

endif;

// 投稿（ブログ）のアーカイブか、カスタム投稿タイプのアーカイブかを判定する。
// メンバー等のCPTがここに流れてきたとき「Blog / 記事一覧」と誤表示しないため。
$is_blog = ! is_post_type_archive();

if ( is_category() ) {
	$archive_heading = single_cat_title( '', false );
} elseif ( is_tag() ) {
	$archive_heading = single_tag_title( '', false );
} elseif ( is_author() ) {
	$queried         = get_queried_object();
	$archive_heading = ( $queried && ! empty( $queried->display_name ) ) ? $queried->display_name : '記事一覧';
} elseif ( is_date() ) {
	$archive_heading = get_the_date( 'Y年n月' );
} elseif ( is_post_type_archive() ) {
	$pt              = get_queried_object();
	$archive_heading = ( $pt && ! empty( $pt->labels->name ) ) ? $pt->labels->name : '一覧';
} else {
	$archive_heading = '記事一覧';
}

$archive_label = $is_blog ? 'Blog' : '';
$archive_text  = $is_blog ? '映像制作・SNS運用・マーケティングに関する情報を発信しています。' : '';
?>

<!-- FV -->
<section class="p-worksArchive-fv">
	<div class="p-worksArchive-fv__bg">
		<?php if ( $archive_label ) : ?><span class="p-worksArchive-fv__label"><?php echo esc_html( $archive_label ); ?></span><?php endif; ?>
		<h1 class="p-worksArchive-fv__heading"><?php echo esc_html( $archive_heading ); ?></h1>
		<?php if ( $archive_text ) : ?><p class="p-worksArchive-fv__text"><?php echo esc_html( $archive_text ); ?></p><?php endif; ?>
	</div>
</section>

<!-- アーカイブ -->
<section class="p-worksArchive">
<div class="l-inner">

	<!-- ヘッダー行 -->
	<div class="p-worksArchive__headRow fadeup">
		<div class="p-worksArchive__titleBlock">
			<?php if ( $archive_label ) : ?><span class="p-worksArchive__titleLabel"><?php echo esc_html( $archive_label ); ?></span><?php endif; ?>
			<h2 class="p-worksArchive__heading"><?php echo esc_html( $is_blog ? '記事一覧' : $archive_heading ); ?></h2>
		</div>
		<?php if ( $is_blog ) : ?>
		<div class="p-worksArchive__filterRow">
			<?php
			$blog_cats    = get_categories( [ 'hide_empty' => true ] );
			$blog_top_id  = (int) get_option( 'page_for_posts' );
			$blog_top_url = $blog_top_id ? get_permalink( $blog_top_id ) : home_url( '/' );
			$current_cat  = is_category() ? (int) get_queried_object_id() : 0;
			?>
			<a href="<?php echo esc_url( $blog_top_url ); ?>"
			   class="p-worksArchive__filterTab<?php echo $current_cat ? '' : ' is-active'; ?>">
				すべて
			</a>
			<?php if ( ! empty( $blog_cats ) && ! is_wp_error( $blog_cats ) ) : foreach ( $blog_cats as $blog_cat ) : ?>
			<a href="<?php echo esc_url( get_category_link( $blog_cat->term_id ) ); ?>"
			   class="p-worksArchive__filterTab<?php echo ( $current_cat === (int) $blog_cat->term_id ) ? ' is-active' : ''; ?>">
				<?php echo esc_html( $blog_cat->name ); ?>
			</a>
			<?php endforeach; endif; ?>
		</div>
		<?php endif; ?>
	</div>

	<!-- 区切り線 -->
	<div class="p-worksArchive__divider" aria-hidden="true"></div>

	<!-- 記事リスト -->
	<div class="p-worksArchive__frame">

		<div class="p-worksArchive__grid">
			<?php
			// 画像が1枚も見つからなかったときのフォールバック。
			// 制作実績用の dummy-works.png はブログと無関係な街並みの写真なので、
			// ブランドのOGP画像を使う。
			$blog_placeholder = content_url( '/uploads/2026/09/ogp-b.png' );
			$blog_delays      = [ '', 'fadeup--d1', 'fadeup--d2' ];
			$blog_i           = 0;
			if ( have_posts() ) : while ( have_posts() ) : the_post();
				$thumb_url = marketik_archive_card_image( get_the_ID(), $blog_placeholder );

				// 日付とカテゴリはブログ記事のためのもの。
				// メンバー一覧に投稿日が出ても意味が無いので出さない。
				$meta_date = $is_blog ? get_the_date( 'Y.m.d' ) : '';
				$cat_name  = '';
				if ( $is_blog ) {
					$cats     = get_the_category();
					$cat_name = ( ! empty( $cats ) && ! is_wp_error( $cats ) ) ? $cats[0]->name : '';
				}

				$blog_delay = $blog_delays[ $blog_i % 3 ];
				$blog_i++;
			?>
			<article class="p-worksArchive__card fadeup <?php echo esc_attr( $blog_delay ); ?>">
				<a href="<?php the_permalink(); ?>" class="p-worksArchive__cardLink">
					<div class="p-worksArchive__cardImgWrap">
						<img src="<?php echo esc_url( $thumb_url ); ?>"
						     alt="<?php echo esc_attr( get_the_title() ); ?>"
						     loading="lazy">
					</div>
					<div class="p-worksArchive__cardBody">
						<?php if ( $meta_date || $cat_name ) : ?>
						<div class="p-worksArchive__cardMeta">
							<?php if ( $meta_date ) : ?>
							<span class="p-worksArchive__cardClient"><?php echo esc_html( $meta_date ); ?></span>
							<?php endif; ?>
							<?php if ( $cat_name ) : ?>
							<span class="p-worksArchive__chip"><?php echo esc_html( $cat_name ); ?></span>
							<?php endif; ?>
						</div>
						<?php endif; ?>
						<p class="p-worksArchive__cardTitle"><?php the_title(); ?></p>
					</div>
				</a>
			</article>
			<?php endwhile; else : ?>
			<p class="p-worksArchive__empty"><?php echo esc_html( $is_blog ? '記事がまだありません。' : '該当する項目が見つかりませんでした。' ); ?></p>
			<?php endif; ?>
		</div>

		<?php if ( $GLOBALS['wp_query']->max_num_pages > 1 ) : ?>
		<div class="p-pagenavi">
			<?php
			the_posts_pagination( [
				'mid_size'  => 1,
				'prev_text' => '前へ',
				'next_text' => '次へ',
			] );
			?>
		</div>
		<?php endif; ?>

	</div>

</div><!-- /.l-inner -->
</section>

<?php get_footer(); ?>
