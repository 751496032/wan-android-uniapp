<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<div class="u-page">
			<!-- 轮播图 -->
			<div class="banner-wrapper">
				<u-swiper :list="bannerList" :effect3d="true" :height="290" mode="dot"
				imgMode="aspectFill" bgColor="#ffffff" effect3d-previous-margin="90" border-radius="12"></u-swiper>
			</div>
			
			<!-- 文章列表 -->
			<view class="project-wrapper">
				<u-waterfall v-model="flowList">
					<template v-slot:left="{leftList}">
						<view  class="water" v-for="(item, index) in leftList" :key="index">
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index" ></u-lazy-load>
							<view class="item-title">{{ item.title }}</view>
							<view class="item-author">{{ item.author }}</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						
						<view  class="water" v-for="(item, index) in rightList" :key="index">
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index" ></u-lazy-load>
							<view class="item-title">{{ item.title }}</view>
							<view class="item-author">{{ item.author }}</view>
						</view>
					</template>
				</u-waterfall>
			
			</view>
			
			<!-- loading -->
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
	import {getTabbarData} from "../../../utils/common.js"
	import {Project} from './model.js'
	export default {
		data() {
			return {
				tabbar: getTabbarData(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
				show: true,
				bannerList: [],
				currentPage:0,
				totalPage:0,
				flowList:[]
			}
		},

		onLoad: function() {

		},

		created() {
			console.log('created')
			
		},
		
		mounted() {
			console.log('mounted')
			this.getBannerInfo()
			
		},

		destroyed() {

		},
		methods: {
			
			getProjectInfo(pageIndex){
				let _this=this
				uni.request({
					url:"https://www.wanandroid.com/project/list/".concat(pageIndex).concat("/json?cid=294"),
					success(res) {
						console.log('getProjectInfo result: ' + JSON.stringify(res.data))
						
						if(res.data.errorCode==0){
							let realData=res.data.data.datas
							for (var i = 0; realData!=null&& i <realData.length; i++) {
								let item=realData[i]
								let project=new Project(item.envelopePic,item.title,item.author,item.niceDate)
								_this.flowList.push(project)
							}
						}
						
					},
					fail(res) {
						
					},
					complete() {
						if(pageIndex==0){
							_this.show = false
						}
					}
					
				})
			},
			
			getBannerInfo(){
				let _this=this
				uni.request({
					url: 'https://www.wanandroid.com/banner/json',
					header:{
						"Access-Control-Allow-Origin": '*'
					},
					success(res) {
						// let json = JSON.parse()
						//将对象转成json字符串
						console.log('getBannerInfo result: ' + JSON.stringify(res.data))
						if(res.data.errorCode==0){
							let data=res.data.data
							for (var i = 0; data!=null&& i <data.length; i++) {
								let item=data[i]
								_this.bannerList.push(item.imagePath)
								console.log("item img: "+item.imagePath)
							}
						}
					},
					fail(res) {
						console.log('error: ' + res.message)
					},
					complete: () => {
						_this.getProjectInfo(0)
					}
				
				})
			} ,
			
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
	
	.project-wrapper{
		background-color: #C8C9CC;
	}
	
	.water{
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	.item-title{
		margin-top: 5px;
		display: flex;
	}
	.item-author{
		margin-top: 5px;
		display: flex;
	}
</style>
