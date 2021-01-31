<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="tabbar" ref="tabbar" v-model="current" :iconSize=50 :list="tabbar" :inactive-color="inactiveColor"
		 :activeColor="activeColor" :hideTabBar="true"></u-tabbar>

	</view>

</template>

<script>
	import Tabbar from '../../uview-ui/components/u-tabbar/u-tabbar.vue'
	import {getTabbarData} from '../../utils/common.js'

	export default {
		components: {
			'tabbar': Tabbar
		},
		data() {
			return {
				tabbar: getTabbarData(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
			}
		},

		onLoad: function() {
			this.tabbar = getTabbarData()
		},

		onInit: () => {
			console.log('onInit')
		},

		onShow: () => {
			console.log('onShow')

		},

		onReady: () => {
			console.log('onReady')

		},

		mounted() {
			this.$refs.tabbar.switchTab(0)

		},

		methods: {}
	}
</script>

<style>

</style>
