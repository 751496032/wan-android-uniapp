
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index","pages/wanandroid/home/home","pages/wanandroid/official-account/official","pages/wanandroid/main","pages/wanandroid/detail/webview","pages/wanandroid/official-account/project-list"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#38b3f4","backgroundColor":"#ffffff","fontSize":"10px","list":[{"text":"首页","iconPath":"static/icon_home_unselected.png","selectedIconPath":"static/icon_home_selected.png","pagePath":"pages/wanandroid/home/home"},{"text":"公众号","iconPath":"static/icon_official_unselected.png","selectedIconPath":"static/icon_official_selected.png","pagePath":"pages/wanandroid/official-account/official"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-app-demo","compilerVersion":"3.1.4","entryPagePath":"pages/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"小程序"}},{"path":"/pages/wanandroid/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true,"titleNView":{"homeButton":true}}},{"path":"/pages/wanandroid/official-account/official","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"公众号","enablePullDownRefresh":false}},{"path":"/pages/wanandroid/main","meta":{},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":false,"animationType":"none","animationDuration":50,"titleNView":{"homeButton":true,"autoBackButton":false}}},{"path":"/pages/wanandroid/detail/webview","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false,"titleNView":{"buttons":[{"type":"share","width":"46px"}]}}},{"path":"/pages/wanandroid/official-account/project-list","meta":{},"window":{"navigationBarTitleText":"公众号","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
