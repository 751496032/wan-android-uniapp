# wan-android-uniapp
基于uni-app框架的一款简单应用，运行请用HBuider X编译器，接口是WanAndroid的开放接口




@[toc]
## 前言

uni-app相信很多人都不会陌生，特别是做前端更是，uni-app是基于vue.js开发的前端框架，一套代码多端运行；github star很平稳的增长，更多的是国内开发者关注，另外我们也看出关于跨平台的技术，flutter是遥遥领先，github star指数一定程度上可以辅助我们做技术选型。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/582e2a9130af8486de55fe0d8009b3fc.png#pic_center)

从百度指数来看，热度反而超过了flutter，可以看出uni-app框架在国内很受欢迎。觉得可以去尝试下，如果有vue的基础，对uni-app这个框架会上手很快。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/f6a3f6a7c30c7eb919b68cc5f4b88710.png#pic_center)


关于HTML、CSS、Vue的知识这里简单总结了一些笔记，对刚刚初学者应该有点帮助。

- [CSS - Flex弹性布局笔记](https://blog.csdn.net/hzw2017/article/details/115028445)
- [CSS - 居中布局常用方法](https://blog.csdn.net/hzw2017/article/details/115029049)
- [vue - 写给自己看的教程](https://blog.csdn.net/hzw2017/article/details/115029283)

## 效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/c7e814517f7c9dd5f5acf3248a5f73ca.gif#pic_center)



- github地址：[https://github.com/751496032/wan-android-uniapp](https://github.com/751496032/wan-android-uniapp)
- 开放接口：[https://www.wanandroid.com/blog/show/2](https://www.wanandroid.com/blog/show/2)
- UI组件库：[https://uviewui.com/](https://uviewui.com/)

uni-app官方也提供一套[UI组件库](https://uniapp.dcloud.io/component/README)，这里使用一个第三方组件库[uView](https://uviewui.com/)，uView是专门基于uni-app开发的一套UI组件库，进行高度封装使用很方便。



## 项目结构

```
┌─cloudfunctions        云函数目录（阿里云为aliyun，腾讯云为tcb）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录，详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
    
```

## 路由配置与跳转

### 配置

路由是在`pages.json `中配置，如下


```
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index",
			"style": {
				"navigationBarTitleText": "小程序"
			}
		}

		, {
			"path": "pages/wanandroid/home/home",
			"style": {
				"navigationBarTitleText": "首页",
				"enablePullDownRefresh": true,
				"app-plus":{
					"titleNView":{
						"homeButton":true
						
					}
				}
			}

		}
```


path的属性值是在components目录下的相对路径，开头没有`/`这个需要注意，与vue的路由配置有点不同。

### 跳转

路由的跳转也是比较简单的，通过uni调用navigateTo函数就可以实现，页面打开与退出是进出栈的过程，具体参考[官方文档](https://uniapp.dcloud.io/frame?id=%e8%b7%af%e7%94%b1%e8%b7%b3%e8%bd%ac)

```
intoWanandroidMain() {
	uni.navigateTo({
		url: './wanandroid/main',
		animationType: 'none', //把动画去除  主要是为了避免页面跳转闪动问题
	    animationDuration: 300
})
}
```


路由跳转参数传递，通过拼接url即可携带，与普通url拼接规则是一样的，`xxxx?title=xxx&url=xxxx`，如下

```
gotoWebView(title,url){
    console.log('title '+title)
    uni.navigateTo({
    	url:'../detail/webview?title='.concat(title).concat('&url=').concat(url),
    	animationType: 'slide-in-right',
    	animationDuration: 300
    				
    })
},
```




### 参数获取

比如在Home.vue页面进入webview.vue页面，在目标组件的[**页面生命周期函数onLoad**](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)中获取：


```
		onLoad: function(option) {
			this.url = option.url
			this.title = option.title
			if (option.title !== undefined || option.title !== null) {
				uni.setNavigationBarTitle({
					title: option.title
				})
			}

		}
```


## 网络请求

在调试接口的时候，在没有后台的配合下，建议使用HBuider X的内置浏览器，可以避免跨域的问题。

这里使用一个开放API，做Android基本上应该都知道的[WanAndroid](https://www.wanandroid.com/blog/show/2)，在uni-app中网络请求也是比较简单友好的，通过uni对象调用request函数，然后填鸭式传入参数即可，详细[查看官网文档](https://uniapp.dcloud.io/api/request/request)



```
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
```

了解上面这几个步骤基本可以开发一些简单的应用，关于uni-app框架的API和组件库可以参考官方资料，边做项目边学习，然后自己总结疑难点输出，这样对一个新技术才会自己的理解，形成自己的知识体系；先学会如何使用，后面再去慢慢去了解底层原理。

> 关于去除eslint的警告的方法：https://www.jianshu.com/p/57f51bcdf1d4









