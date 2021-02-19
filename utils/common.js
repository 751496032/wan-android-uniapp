export function initTabbar() {
	return [{
			iconPath: "/static/icon_home_unselected.png",
			selectedIconPath: "/static/icon_home_selected.png",
			text: '首页',
			customIcon: false,
			pagePath: '/pages/wanandroid/home/home',
		},
		{
			iconPath: "/static/icon_official_unselected.png",
			selectedIconPath: "/static/icon_official_selected.png",
			text: '我的',
			count: 2,
			isDot: true,
			customIcon: false,
			pagePath: '/pages/wanandroid/official/official',
		}
	]
}
