<template>
	<view class="content"> 
		<text> 公众号</text>
	
		<!-- 所有内容的容器 -->
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="tabbar"  v-model="current" :iconSize="40" :list="tabbar" :inactive-color="inactiveColor" :activeColor="activeColor"
		 :hideTabBar="true"></u-tabbar>
	</view>
</template>

<script>
	import {getTabbarData} from "../../../utils/common.js"
	export default {
		data() {
			return {
				tabbar:getTabbarData(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
			}
		},
		
		onLoad:function(){

		},

		methods: {

		}
	}
</script>

<style>
	page,
	view {
		height: 100%;
	}
	
	.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

</style>
