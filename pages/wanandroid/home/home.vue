<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<div class="u-page">
			<div class="banner-wrapper">
				<u-swiper :list="banners" :effect3d="true" :height="290" mode="dot"
				imgMode="aspectFill" bgColor="#ffffff" effect3d-previous-margin="90" border-radius="12"></u-swiper>
			</div>
			
			<div class="loading-wrapper">
				<u-loading mode="flower" size="60" :show="show"></u-loading>
			</div>
		</div>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="tabbar" v-model="current" :iconSize="50" :list="tabbar" :inactive-color="inactiveColor" :activeColor="activeColor"
		 :hideTabBar="true"></u-tabbar>

	</view>
</template>

<script>
	import {
		getTabbarData
	} from "../../../utils/common.js"
	export default {
		data() {
			return {
				tabbar: getTabbarData(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
				show: true,
				banners: []
			}
		},

		onLoad: function() {

		},

		created() {
			console.log('created')
			
		},
		
		mounted() {
			console.log('mounted')
			let home=this
			uni.request({
				url: 'https://www.wanandroid.com/banner/json',
				header:{
					"Access-Control-Allow-Origin": '*'
				},
				success(res) {
					// let json = JSON.parse()
					//将对象转成json字符串
					console.log('result: ' + JSON.stringify(res.data))
					if(res.data.errorCode==0){
						let data=res.data.data
						for (var i = 0; data!=null&& i <data.length; i++) {
							let item=data[i]
							home.banners.push(item.imagePath)
							console.log("item img: "+item.imagePath)
						}
					}
				},
				fail(res) {
					console.log('error: ' + res.message)
				},
				complete: () => {
					this.show = false
				}
			
			})
		},

		destroyed() {

		},
		methods: {

		}
	}
</script>

<style>
	page,view {
		height: 100%;
	}
	
	

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.u-page{
		width: 100%;
		
	}
	
	.banner-wrapper{
		width: 100%;
		height: 300rpx;
		margin-top: 10rpx;
		
	}

	.loading-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
