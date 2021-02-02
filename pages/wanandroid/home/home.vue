<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<div class="u-page">
			<!-- 轮播图 -->
			<div class="banner-wrapper">
				<u-swiper :list="bannerList" :effect3d="true" :height="290" mode="dot"
				imgMode="aspectFill" bgColor="#ffffff" effect3d-previous-margin="90" border-radius="12"></u-swiper>
			</div>
			
			<!-- 项目列表 -->
			<view class="project-wrapper">
				<view class="item-container">
					<view class="image-wrapper">
						<u-image 
						border-radius="10"
						src="https://www.wanandroid.com/blogimgs/53dca75f-b021-41b7-a5ab-aa2f9ebceed7.png" 
						mode="widthFix"
						width="140rpx" ></u-image>
					</view>
					<div class="text-wrapper">
						<div class="title">
							<text >Flutter_Mall 基于litemall的Flutter开源在线商城应用程序</text>
						</div>
						
						<div class="author-info">
							<text>979451341</text>
							<text>2021-01-28 00:35</text>
						</div>
					</div>
				</view>
			
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

		methods: {
			
			getProjectInfo(pageIndex){
				let _this=this
				uni.request({
					url:"https://www.wanandroid.com/project/list/".concat(pageIndex).concat("/json?cid=294"),
					success(res) {
						console.log('getProjectInfo result: ' + JSON.stringify(res.data))
						
						if(res.data.errorCode==0){
							let realData=res.data.data.datas
							let tempData=[]
							for (var i = 0; realData!=null&& i <realData.length; i++) {
								let item=realData[i]
								let project=new Project(item.envelopePic,item.title,item.author,item.niceDate)
								tempData.push(project)
							}
							_this.flowList=_this.flowList.concat(tempData)
							console.log('flowList: '+_this.flowList.length)
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
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	
	.item-container{
		background-color: #DBF1E1;
		display: flex;
		flex-direction: row;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		box-sizing: content-box;
		border-radius: 10rpx;
		padding-top: 10rpx;
	    padding-left: 10rpx;
		padding-bottom: 2rpx;
	}
	.image-wrapper{
		display: table-cell;
	}
	
	.text-wrapper{
		display: table-cell;
		margin-left: 10rpx;
		height: 100%;
		background-color: #007AFF;
		
	}
	
	
	
	
	
</style>
