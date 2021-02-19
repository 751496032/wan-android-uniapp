<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar ref="tabbar"  v-model="current" :iconSize="40" :list="tabbar" :inactive-color="inactiveColor" :activeColor="activeColor"
		 :hideTabBar="true"></u-tabbar>

	</view>

</template>

<script>
	import Tabbar from '../../uview-ui/components/u-tabbar/u-tabbar.vue'
	import {initTabbar} from '../../utils/common.js'

	export default {
		components: {
			'tabbar': Tabbar
		},
		data() {
			return {
				tabbar: initTabbar(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
			}
		},

		onLoad: function() {
			console.log('onLoad')
			this.tabbar = initTabbar()
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
			console.log('mounted')
			this.$refs.tabbar.switchTab(0)
		},

		methods: {}
	}
</script>

<style>

</style>
