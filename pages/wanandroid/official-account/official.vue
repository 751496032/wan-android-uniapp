<template>
	<view class="content">

		<!-- 所有内容的容器 -->
		<view class="grid-list-wrapper" v-show="isShowGrid">
			<u-grid :col="3" @click="click">
				<u-grid-item v-for="(value,index) in list" :key='index' :index="index">
					<u-icon name="weixin-fill" :size="52"></u-icon>
					<view class="grid-text">{{value.name}}</view>
				</u-grid-item>
			</u-grid>
		</view>


		<view class="loading-wrapper">
			<u-loading mode="flower" size="60" :show="isShowLoading"></u-loading>
		</view>


		<view>
			<u-toast ref="uToast" />
		</view>


		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :iconSize="40" :list="tabbar" :inactive-color="inactiveColor" :activeColor="activeColor"
		 :hideTabBar="true"></u-tabbar>
	</view>
</template>

<script>
	import {
		initTabbar
	} from "../../../utils/common.js"
	export default {
		data() {
			return {
				tabbar: initTabbar(),
				current: 0,
				inactiveColor: '#bfbfbf',
				activeColor: '#38b3f4',
				isShowLoading: true,
				isShowGrid: false,
				list: []
			}
		},

		onLoad: function() {

		},

		mounted() {
			this.initData()
		},

		methods: {

			initData() {
				let _this = this
				uni.request({
					url: 'https://wanandroid.com/wxarticle/chapters/json',
					success(res) {
						console.log('official body: ' + JSON.stringify(res.data))
						_this.list = res.data.data
						_this.isShowGrid = _this.list.length > 0
					},

					fail(res) {

					},

					complete() {
						_this.isShowLoading = false
					}


				})
			},
			click(index) {
				console.log('click item ' + this.list[index].name)
				// this.showToast(this.list[index].name)
				uni.navigateTo({
					url:'project-list?title='.concat(this.list[index].name).concat("&id=").concat(this.list[index].id),
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			},

			showToast(msg) {
				this.$refs.uToast.show({
					title: msg,
					// type: 'success',
					icon: false
				})
			}

		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;

	}

	.loading-wrapper {
		width: 100%;
		/* height: 100%; */
		position: relative;
		top: 40%;
		left: 50%;
		/* display: flex;
		justify-content: center;
		align-items: center; */

	}

	.grid-list-wrapper {
		padding: 60rpx;
	}

	.grid-text {
		font-size: 24rpx;
		margin-top: 20rpx;
		/* 用于修改字体大小，在内置浏览器中最小是12rpx，无法更小 */
		/* transform: scale(0.8); */
	}
</style>
