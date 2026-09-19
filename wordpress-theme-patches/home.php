<?php get_header(); ?>

<!-- FV -->
<section class="p-worksArchive-fv">
	<div class="p-worksArchive-fv__bg">
		<span class="p-worksArchive-fv__label">Blog</span>
		<h1 class="p-worksArchive-fv__heading">ブログ</h1>
		<p class="p-worksArchive-fv__text">映像制作・SNS運用・マーケティングに関する情報を発信しています。</p>
	</div>
</section>

<!-- Blog アーカイブ -->
<section class="p-worksArchive">
<div class="l-inner">

	<!-- ヘッダー行 -->
	<div class="p-worksArchive__headRow fadeup">
		<div class="p-worksArchive__titleBlock">
			<span class="p-worksArchive__titleLabel">Blog</span>
			<h2 class="p-worksArchive__heading">記事一覧</h2>
		</div>
		<div class="p-worksArchive__filterRow">
			<?php
			$blog_cats     = get_categories( [ 'hide_empty' => true ] );
			$blog_top_id   = (int) get_option( 'page_for_posts' );
			$blog_top_url  = $blog_top_id ? get_permalink( $blog_top_id ) : home_url( '/' );
			?>
			<a href="<?php echo esc_url( $blog_top_url ); ?>"
			   class="p-worksArchive__filterTab is-active">
				すべて
			</a>
			<?php if ( ! empty( $blog_cats ) && ! is_wp_error( $blog_cats ) ) : foreach ( $blog_cats as $blog_cat ) : ?>
			<a href="<?php echo esc_url( get_category_link( $blog_cat->term_id ) ); ?>"
			   class="p-worksArchive__filterTab">
				<?php echo esc_html( $blog_cat->name ); ?>
			</a>
			<?php endforeach; endif; ?>
		</div>
	</div>

	<!-- 区切り線 -->
	<div class="p-worksArchive__divider" aria-hidden="true"></div>

	<!-- 記事リスト -->
	<div class="p-worksArchive__frame">

		<div class="p-worksArchive__grid">
			<?php
			$blog_delays = [ '', 'fadeup--d1', 'fadeup--d2' ];
			$blog_i      = 0;
			if ( have_posts() ) : while ( have_posts() ) : the_post();
				$thumb_url  = get_the_post_thumbnail_url( get_the_ID(), 'large' ) ?: get_template_directory_uri() . '/assets/images/dummy-works.png';
				$cats       = get_the_category();
				$cat_name   = ( ! empty( $cats ) && ! is_wp_error( $cats ) ) ? $cats[0]->name : '';
				$blog_delay = $blog_delays[ $blog_i % 3 ];
				$blog_i++;
			?>
			<article class="p-worksArchive__card fadeup <?php echo $blog_delay; ?>">
				<a href="<?php the_permalink(); ?>" class="p-worksArchive__cardLink">
					<div class="p-worksArchive__cardImgWrap">
						<img src="<?php echo esc_url( $thumb_url ); ?>"
						     alt="<?php echo esc_attr( get_the_title() ); ?>"
						     loading="lazy">
					</div>
					<div class="p-worksArchive__cardBody">
						<div class="p-worksArchive__cardMeta">
							<span class="p-worksArchive__cardClient"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></span>
							<?php if ( $cat_name ) : ?>
							<span class="p-worksArchive__chip"><?php echo esc_html( $cat_name ); ?></span>
							<?php endif; ?>
						</div>
						<p class="p-worksArchive__cardTitle"><?php the_title(); ?></p>
					</div>
				</a>
			</article>
			<?php endwhile; else : ?>
			<p class="p-worksArchive__empty">記事がまだありません。</p>
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
