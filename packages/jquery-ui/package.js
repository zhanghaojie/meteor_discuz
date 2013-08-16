Package.describe({
	summary: "jQuery-ui version 1.10.3"
})

Package.on_use(function(api) {
	api.use("jquery", "client");
	api.add_files(["js/jquery-ui-1.10.3.js"], "client");
	/*
	api.add_files(["css/ui-lightness/images/ui-icons_ffffff_256x240.png",
			"css/ui-lightness/images/ui-icons_ffd27a_256x240.png",
			"css/ui-lightness/images/ui-icons_ef8c08_256x240.png",
			"css/ui-lightness/images/ui-icons_222222_256x240.png",
			"css/ui-lightness/images/ui-icons_228ef1_256x240.png",
			"css/ui-lightness/images/ui-bg_highlight-soft_100_eeeeee_1x100.png",
			"css/ui-lightness/images/ui-bg_highlight-soft_75_ffe45c_1x100.png",
			"css/ui-lightness/images/ui-bg_gloss-wave_35_f6a828_500x100.png",
			"css/ui-lightness/images/ui-bg_glass_100_fdf5ce_1x400.png",
			"css/ui-lightness/images/ui-bg_glass_100_f6f6f6_1x400.png",
			"css/ui-lightness/images/ui-bg_glass_65_ffffff_1x400.png",
			"css/ui-lightness/images/ui-bg_flat_10_000000_40x100.png",
			"css/ui-lightness/images/ui-bg_diagonals-thick_20_666666_40x40.png",
			"css/ui-lightness/images/ui-bg_diagonals-thick_18_b81900_40x40.png",
			"css/ui-lightness/images/animated-overlay.gif"], "client");
*/
})
