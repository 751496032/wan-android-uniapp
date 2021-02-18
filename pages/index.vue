<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<button v-on:click="requestNetwork()">访问网络</button>
		<button v-on:click="intoWanandroidMain()">WanAndroid</button>

		<wyb-loading ref="loading" class="loading" loadingType="scale-line" title="加载中..." />

		<div>
			{{responseText}}
		</div>




	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {

		components: {
			wybLoading
		},

		data() {
			return {
				title: 'Hello',
				responseText: "",

			}
		},
		onLoad: (option) => {

		},
		methods: {
			requestNetwork() {
				//https://www.wanandroid.com/banner/json
				console.log('请求网络')
				this.$refs.loading.showLoading()
				this.responseText = '开始请求网络'
				uni.request({
					url: 'https://www.wanandroid.com/banner/json',
					success: (res) => {
						this.responseText = res.data
					},
					fail: (res) => {
						console.log('请求失败：' + res.message)
					},
					complete: () => {
						console.log('完成请求')

						setTimeout(() => {
							this.$refs.loading.hideLoading()
						}, 1000)


					}
				})
			},

			intoWanandroidHome() {
				uni.navigateTo({
					//url拼接传参，在目标页面的onLoad函数中获取
					url: '../wanandroid/home/home?userName=HZWei',
					animationType: 'pop-in',
					animationDuration: 800

				})
			},

			intoWanandroidMain() {
				console.log('intoWanandroidMain')
				uni.navigateTo({
					url: './wanandroid/main',
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	button,
	div {
		margin-top: 20rpx;
	}

	.loading {
		display: flex;
		width: 100%;
		height: 100%;
	}
</style>
