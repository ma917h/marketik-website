<?php get_header(); ?>

<main>
	<section class="p-post c-subWrap">
		<div class="l-inner p-post__inner">
			<div class="p-post__head">
				<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></time>
				<h1 class="p-post__title">
					<?php the_title() ?>
				</h1>
			</div>
			<?php if ( has_post_thumbnail() ) : ?>
			<div class="p-post__thumbnail">
				<img src="<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'large' ) ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>">
			</div>
			<?php endif; ?>
			<div class="p-post__wrap">
				<?php the_content(); ?>
			</div>
			<!-- 記事送り -->
			<div class="p-post__pagination p-postPagination">
				<ul class="p-postPagination__container">
					<!-- 前の記事があれば表示 -->
					<li class="p-postPagination__link p-postPagination__link-pageprev">
						<?php
						$link = get_previous_post_link('%link', '前へ', TRUE);
						if ($link) {
							$link = str_replace('<a', '<a class="p-postPagination__link"', $link);
							echo $link;
						} else {
							echo '<span class="p-postPagination__link --placeholder">前へ</span>';
						}
						?>
					</li>

					<!-- 同カテゴリーの一覧へ -->
					<li class="p-postPagination__link p-postPagination__link-archive">
						<?php
						$category      = get_the_category();
						$blog_top_id   = (int) get_option( 'page_for_posts' );
						if ( ! empty( $category ) && ! is_wp_error( $category ) ) {
							$archive_link = get_category_link( $category[0]->cat_ID );
						} elseif ( $blog_top_id ) {
							$archive_link = get_permalink( $blog_top_id );
						} else {
							$archive_link = home_url( '/' );
						}
						?>
						<a class="p-postPagination__link" href="<?php echo esc_url($archive_link); ?>"><span>一覧へ戻る</span></a>
					</li>

					<!-- 次の記事があれば表示 -->
					<li class="p-postPagination__link p-postPagination__link-pagenext">
						<?php
						$link = get_next_post_link('%link', '次へ', TRUE);
						if ($link) {
							$link = str_replace('<a', '<a class="p-postPagination__link"', $link);
							echo $link;
						} else {
							echo '<span class="p-postPagination__link  --placeholder">次へ</span>';
						}
						?>
					</li>
				</ul>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>
