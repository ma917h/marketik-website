<header class="p-header js-header">
	<div class="p-header__inner">
		<?php if(is_front_page()): ?>
			<h1 class="p-header__logo">
				<a href="<?php echo home_url('/'); ?>"><img class="p-header__logo-img" src="<?php echo get_template_directory_uri(); ?>/assets/images/common/logo-black.png" alt="Marketik" width="7562" height="1658" /></a>
			</h1>
		<?php else: ?>
			<p class="p-header__logo">
				<a href="<?php echo home_url('/'); ?>"><img class="p-header__logo-img" src="<?php echo get_template_directory_uri(); ?>/assets/images/common/logo-black.png" alt="Marketik" width="7562" height="1658" /></a>
			</p>
		<?php endif; ?>
		<nav class="p-header__nav u-desktop">
			<ul class="p-header__navItems">
				<li class="p-header__navItem"><a href="<?php echo home_url('/'); ?>#about">About Us</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/service/'); ?>">Service</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/'); ?>#mvv">MVV</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/'); ?>#member">Member</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/works/'); ?>">Works</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/blog/'); ?>">Blog</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/'); ?>#company">Company</a></li>
				<li class="p-header__navItem"><a href="<?php echo home_url('/contact/'); ?>">Contact</a></li>
			</ul>
		</nav>
		<button class="p-header__hamburger c-hamburger js-hamburger u-mobile" id="MenuButton">
			<span></span>
			<span></span>
			<span></span>
		</button>
		<!-- ドロワーメニュー -->
		<?php get_template_part('parts/parts-drawer'); ?>
	</div>
</header>
