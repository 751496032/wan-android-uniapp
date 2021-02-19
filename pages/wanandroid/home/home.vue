<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<view class="u-page">
			<!-- 轮播图 -->
			<view class="banner-wrapper">
				<u-swiper :list="bannerList" :effect3d="true" :height="290" mode="dot" imgMode="aspectFill" bgColor="#ffffff"
				 effect3d-previous-margin="90" border-radius="12"></u-swiper>
			</view>

			<!-- 项目列表 -->
			<view class="project-wrapper">
				<view class="item-container" v-for="(item,index) in projectList" :key="index">
					<u-image border-radius="10" :src="item.image" mode="aspectFill" width="180rpx" height="200rpx" :lazy-load="true"
					 :fade="true" duration="400"></u-image>
					<view class="text-wrapper">
						<text class="text-title">{{item.title}}</text>

						<view class="text-bottom-container">
							<text>作者：{{item.author}}</text>
							<text>日期：{{item.date}}</text>
						</view>
					</view>
				</view>

			</view>

			<!-- 中间loading -->
			<view class="loading-wrapper">
				<u-loading mode="flower" size="60" :show="show"></u-loading>
			</view>
			<!-- 列表加载更多 -->
			<view class="loadmore-wrapper" v-show="showLoadmore">
				<u-loadmore :status="loadmoreStatus"  icon-type="flower"/>
			</view>
		
			
			
		</view>

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="tabbar" v-model="current" :iconSize="40" :list="tabbar" :inactive-color="inactiveColor" :activeColor="activeColor"
		 :hideTabBar="true"></u-tabbar>

	</view>
</template>

<script>
	import {
		initTabbar
	} from "../../../utils/common.js"
	import {
		Project
	} from './model.js'
	export default {
		data() {
			return {
				tabbar: initTabbar(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
				show: true,
				bannerList: [],
				currentPage: 1,
				totalSize:0,
				projectList: [],
				showLoadmore:false,
				loadmoreStatus:'loading',
				isPullDownRefresh:false
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
		
		/* 下拉刷新监听 */
		onPullDownRefresh() {
			this.currentPage==1
			this.isPullDownRefresh=true
			this.getProjectInfo(this.currentPage)
		},
		
		/* 滚动底部监听 */
		onReachBottom() {
			
			console.log('onReachBottom  '  + (this.currentPage) + ' >> '+ (this.totalSize) + ' >> '+ this.projectList.length)
			
			if(this.currentPage==1 || this.projectList.length==0) return
			if(this.totalSize<=this.projectList.length){
				this.loadmoreStatus="nomore"
				return
			}
			console.log('onReachBottom test')
			this.showLoadmore=true
			this.getProjectInfo(this.currentPage)
		},

		methods: {

			getProjectInfo(pageIndex) {
				let _this = this
				uni.request({
					url: "https://www.wanandroid.com/project/list/".concat(pageIndex).concat("/json?cid=294"),
					success(res) {
						console.log('getProjectInfo body: ' + JSON.stringify(res.data))

						if (res.data.errorCode == 0) {
							uni.stopPullDownRefresh();
							if(_this.currentPage==1){
								_this.totalSize=res.data.data.total
							}
							let realData = res.data.data.datas
							
							let tempData = []
							for (var i = 0; realData != null && i < realData.length; i++) {
								let item = realData[i]
								let project = new Project(item.envelopePic, item.title, item.author, item.niceDate)
								tempData.push(project)
							}
							console.log('projectList: ' + _this.projectList.length)
							if(tempData.length<=0){
								return
							}
							
							_this.projectList = _this.isPullDownRefresh?tempData:_this.projectList.concat(tempData)
							_this.currentPage++;
							_this.isPullDownRefresh=false
						}

					},
					fail(res) {
						
					},
					complete() {
						if (pageIndex == 1) {
							_this.show = false
						}
					}

				})
			},

			getBannerInfo() {
				let _this = this
				uni.request({
					url: 'https://www.wanandroid.com/banner/json',
					header: {
						"Access-Control-Allow-Origin": '*'
					},
					success(res) {
						// let json = JSON.parse()
						//将对象转成json字符串
						console.log('getBannerInfo result: ' + JSON.stringify(res.data))
						if (res.data.errorCode == 0) {
							let data = res.data.data
							for (var i = 0; data != null && data.length > 0 && i < data.length; i++) {
								let item = data[i]
								_this.bannerList.push(item.imagePath)
								console.log("item img: " + item.imagePath)
							}
						}
					},
					fail(res) {
						console.log('error: ' + res.message)
					},
					complete: () => {
						_this.getProjectInfo(_this.currentPage)
					}

				})
			},

		}
	}
</script>

<style>

	.banner-wrapper {
		width: 100%;
		height: 300rpx;
		margin-top: 15rpx;
	}

	.loading-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}

	.project-wrapper {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;

	}

	.item-container {
		background-color: #DBF1E1;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		margin-top: 15rpx;
		box-sizing: content-box;
		border-radius: 10rpx;
		padding-left: 10rpx;
		height: 220rpx;
	}

	.text-wrapper {
		margin: 10rpx;
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-weight: 100;
	}

	.text-title {
		flex: 1;
		width: 100%;
	}

	.text-bottom-container {
		width: 100%;
		font-size: 12rpx;
		display: flex;
		flex-direction: row;
		/* align-items: flex-end; */
	}

	.text-bottom-container text {
		flex: 1;
		align-self: flex-end;
	}
</style>
