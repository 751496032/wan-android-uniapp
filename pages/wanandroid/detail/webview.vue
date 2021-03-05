<template>
	<view>
		<web-view :src="url" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				url: '',
				title: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},

		onNavigationBarButtonTap: function(obj) {

			console.log("onNavigationBarButtonTap: " + JSON.stringify(obj))
			switch (obj.type) {
				case "share":
					
					break
			}
		},

		onLoad: function(option) {
			this.url = option.url
			this.title = option.title
			if (option.title !== undefined || option.title !== null) {
				uni.setNavigationBarTitle({
					title: option.title
				})
			}

		}
	}
</script>

<style>
</style>
