<template>
	<view class="content">
		<!-- 所有内容的容器 -->
		<view class="u-page">
			
			<!-- 项目列表 -->
			<view class="project-wrapper">
				<view class="item-container" v-for="(item,index) in projectList" :key="index" @click="onItemClick(item,index)">
					<u-image border-radius="10" :src="item.image" mode="aspectFill" width="180rpx" height="200rpx" :lazy-load="true"
					 :fade="true" duration="400"></u-image>
					<view class="text-wrapper">
						<text class="text-title">{{item.title}}</text>

						<view class="text-bottom-container">
							<view>作者:{{item.author}}</view>
							<view>日期:{{item.date}}</view>
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
				<u-loadmore :status="loadmoreStatus" icon-type="flower" />
			</view>



		</view>


	</view>
</template>

<script>
	
	import {
		Project
	} from '../home/model.js'
	export default {
		data() {
			return {
				title:'',
				id:'',
				currentPage: 1,
				totalSize: 0,
				projectList: [],
				showLoadmore: false,
				loadmoreStatus: 'loading',
				isPullDownRefresh: false
			}
		},

		onLoad: function(option) {
			console.log("onLoad project list "+JSON.stringify(option))
			this.title=option.title
			this.id=option.id
			uni.setNavigationBarTitle({
				title:option.title
			})
		},

		created() {
			console.log('created')

		},

		mounted() {
			console.log('mounted')
			this.getProjectInfo(this.currentPage)

		},

		/* 下拉刷新监听 */
		onPullDownRefresh() {
			this.currentPage = 1
			this.isPullDownRefresh = true
			this.getProjectInfo(this.currentPage)
		},

		/* 滚动底部监听 */
		onReachBottom() {

			console.log('onReachBottom  ' + (this.currentPage) + ' >> ' + (this.totalSize) + ' >> ' + this.projectList.length)

			if (this.currentPage == 1 || this.projectList.length == 0) return
			if (this.totalSize <= this.projectList.length) {
				this.loadmoreStatus = "nomore"
				return
			}
			console.log('onReachBottom test')
			this.showLoadmore = true
			this.getProjectInfo(this.currentPage)
		},
		
		/* 导航栏按钮监听 */
		onNavigationBarButtonTap:function(obj){
			console.log('onNavigationBarButtonTap: '+JSON.stringify(obj))
		},
		
		onBackPress:function(event){
			console.log('onBackPress: '+JSON.stringify(event))
			uni.showToast({
				title:JSON.stringify(event),
				duration:2000
				
			})
		},
		
		methods: {
			
			onItemClick(item,index){
				this.gotoWebView(item.title,item.url)
			},
			
		
			
			gotoWebView(title,url){
				console.log('title '+title)
				uni.navigateTo({
					url:'../detail/webview?title='.concat(title).concat('&url=').concat(url),
					animationType: 'slide-in-right',
					animationDuration: 300
				
				})
			},
			

			getProjectInfo(pageIndex) {
				let _this = this
				uni.request({
					url: "https://wanandroid.com/wxarticle/list/".concat(_this.id+'/').concat(pageIndex).concat("/json"),
					success(res) {
						console.log('getProjectInfo body: ' + JSON.stringify(res.data))

						if (res.data.errorCode == 0) {
							uni.stopPullDownRefresh();
							if (_this.currentPage == 1) {
								_this.totalSize = res.data.data.total
							}
							let realData = res.data.data.datas

							let tempData = []
							for (var i = 0; realData != null && i < realData.length; i++) {
								let item = realData[i]
								let project = new Project(item.envelopePic, item.title,
								 item.author, item.niceDate,item.link)
								tempData.push(project)
							}
							console.log('projectList: ' + _this.projectList.length)
							if (tempData.length <= 0) {
								return
							}

							_this.projectList = _this.isPullDownRefresh ? tempData : _this.projectList.concat(tempData)
							_this.currentPage++;
							_this.isPullDownRefresh = false
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

		
		}
	}
</script>

<style>
	

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
		display: flex;
		flex-direction: row;
		/* align-items: flex-end; */
		justify-content: space-between;
	}

	.text-bottom-container view {
		align-self: flex-end;
		font-size: 22rpx;
		overflow: hidden;
		
	}
	

	
	
</style>
