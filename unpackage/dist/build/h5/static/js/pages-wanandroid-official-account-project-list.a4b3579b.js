(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wanandroid-official-account-project-list"],{"17a8":function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i("abfa"),n={data:function(){return{title:"",id:"",currentPage:1,totalSize:0,projectList:[],showLoadmore:!1,loadmoreStatus:"loading",isPullDownRefresh:!1}},onLoad:function(t){console.log("onLoad project list "+JSON.stringify(t)),this.title=t.title,this.id=t.id,uni.setNavigationBarTitle({title:t.title})},created:function(){console.log("created")},mounted:function(){console.log("mounted"),this.getProjectInfo(this.currentPage)},onPullDownRefresh:function(){this.currentPage=1,this.isPullDownRefresh=!0,this.getProjectInfo(this.currentPage)},onReachBottom:function(){console.log("onReachBottom  "+this.currentPage+" >> "+this.totalSize+" >> "+this.projectList.length),1!=this.currentPage&&0!=this.projectList.length&&(this.totalSize<=this.projectList.length?this.loadmoreStatus="nomore":(console.log("onReachBottom test"),this.showLoadmore=!0,this.getProjectInfo(this.currentPage)))},onNavigationBarButtonTap:function(t){console.log("onNavigationBarButtonTap: "+JSON.stringify(t))},onBackPress:function(t){console.log("onBackPress: "+JSON.stringify(t)),uni.showToast({title:JSON.stringify(t),duration:2e3})},methods:{onItemClick:function(t,e){this.gotoWebView(t.title,t.url)},gotoWebView:function(t,e){console.log("title "+t),uni.navigateTo({url:"../detail/webview?title=".concat(t).concat("&url=").concat(e),animationType:"slide-in-right",animationDuration:300})},getProjectInfo:function(t){var e=this;uni.request({url:"https://wanandroid.com/wxarticle/list/".concat(e.id+"/").concat(t).concat("/json"),success:function(t){if(console.log("getProjectInfo body: "+JSON.stringify(t.data)),0==t.data.errorCode){uni.stopPullDownRefresh(),1==e.currentPage&&(e.totalSize=t.data.data.total);for(var i=t.data.data.datas,n=[],a=0;null!=i&&a<i.length;a++){var r=i[a],s=new o.Project(r.envelopePic,r.title,r.author,r.niceDate,r.link);n.push(s)}if(console.log("projectList: "+e.projectList.length),n.length<=0)return;e.projectList=e.isPullDownRefresh?n:e.projectList.concat(n),e.currentPage++,e.isPullDownRefresh=!1}},fail:function(t){},complete:function(){1==t&&(e.show=!1)}})}}};e.default=n},5335:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return o}));var o={uImage:i("6788").default,uLoading:i("bc53").default,uLoadmore:i("db6d").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"u-page"},[i("v-uni-view",{staticClass:"project-wrapper"},t._l(t.projectList,(function(e,o){return i("v-uni-view",{key:o,staticClass:"item-container",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onItemClick(e,o)}}},[i("u-image",{attrs:{"border-radius":"10",src:e.image,mode:"aspectFill",width:"180rpx",height:"200rpx","lazy-load":!0,fade:!0,duration:"400"}}),i("v-uni-view",{staticClass:"text-wrapper"},[i("v-uni-text",{staticClass:"text-title"},[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"text-bottom-container"},[i("v-uni-view",[t._v("作者:"+t._s(e.author))]),i("v-uni-view",[t._v("日期:"+t._s(e.date))])],1)],1)],1)})),1),i("v-uni-view",{staticClass:"loading-wrapper"},[i("u-loading",{attrs:{mode:"flower",size:"60",show:t.show}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showLoadmore,expression:"showLoadmore"}],staticClass:"loadmore-wrapper"},[i("u-loadmore",{attrs:{status:t.loadmoreStatus,"icon-type":"flower"}})],1)],1)],1)},a=[]},"7d0a":function(t,e,i){"use strict";i.r(e);var o=i("5335"),n=i("f0a5");for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("e446");var r,s=i("f0c5"),l=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"6d85cd62",null,!1,o["a"],r);e["default"]=l.exports},"8dfe":function(t,e,i){var o=i("fbad");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=i("4f06").default;n("45184c8e",o,!0,{sourceMap:!1,shadowMode:!1})},e446:function(t,e,i){"use strict";var o=i("8dfe"),n=i.n(o);n.a},f0a5:function(t,e,i){"use strict";i.r(e);var o=i("17a8"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);e["default"]=n.a},fbad:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,".loading-wrapper[data-v-6d85cd62]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center\n\t/* align-items: center; */}.project-wrapper[data-v-6d85cd62]{width:100%;height:100%;background-color:#fff}.item-container[data-v-6d85cd62]{background-color:#dbf1e1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-left:%?15?%;margin-right:%?15?%;margin-bottom:%?15?%;margin-top:%?15?%;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-border-radius:%?10?%;border-radius:%?10?%;padding-left:%?10?%;height:%?220?%}.text-wrapper[data-v-6d85cd62]{margin:%?10?%;width:100%;height:%?200?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;font-weight:100}.text-title[data-v-6d85cd62]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%}.text-bottom-container[data-v-6d85cd62]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n\t/* align-items: flex-end; */-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.text-bottom-container uni-view[data-v-6d85cd62]{-webkit-align-self:flex-end;align-self:flex-end;font-size:%?22?%;overflow:hidden}",""]),t.exports=e}}]);