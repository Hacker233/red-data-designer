(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d578b34c"],{"47e3":function(t,e,i){"use strict";i.d(e,"b",(function(){return o}));var n={active:"preview",baseUrl:"/design",fileUrl:"/fileUrl",version:"1.8.5"},o=(n.baseUrl,n.fileUrl);e["a"]=n},"50a3":function(t,e,i){},"71f9":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"background-size":"100% 100%","background-color":"#2b3340",overflow:"hidden"},style:{width:t.windowWidth+"px",height:t.conHeight+"px",backgroundColor:t.designCache.bgColor}},[i("div",{staticStyle:{position:"relative","transform-origin":"0 0"},style:{width:t.windowWidth+"px",height:t.conHeight+"px",transform:"scale("+t.containerScale+")"}},[i("transition-group",{attrs:{appear:"",name:"bounce"}},t._l(t.designCache.components,(function(e){return i("div",{key:e.keyId,staticStyle:{position:"absolute"},style:{width:Math.round(e.cptWidth)+"px",height:Math.round(e.cptHeight)+"px",top:Math.round(e.cptY)+"px",left:Math.round(e.cptX)+"px",zIndex:e.cptZ}},[i(e.cptName,{tag:"comment",attrs:{width:Math.round(e.cptWidth),height:Math.round(e.cptHeight),option:e.option},on:{reload:t.loadCacheData}})],1)})),0)],1)])},o=[],a=i("47e3"),c={name:"preview_index",data:function(){return{fileUrl:a["b"],designCache:{},windowWidth:0,windowHeight:0,conHeight:0,containerScale:1,viewCode:""}},mounted:function(){var t=this;t.loadCacheData(),window.onresize=function(){return function(){t.loadSize()}()}},methods:{loadCacheData:function(){this.$route.path;var t=this.$route.query.id;if(!t){var e=JSON.parse(localStorage.getItem("designCache"));this.loadDesign(e,!1)}},loadDesign:function(t,e){e&&(t.components=JSON.parse(t.components)),document.title=t.title,this.designCache=t,this.loadSize()},loadSize:function(){this.windowWidth=document.documentElement.clientWidth,this.windowHeight=document.documentElement.clientHeight,this.containerScale=Math.round(this.windowWidth/1920*100)/100,this.conHeight=this.windowWidth/this.designCache.scaleX*this.designCache.scaleY,this.conHeight<this.windowHeight&&(this.conHeight=this.windowHeight)}}},d=c,h=(i("d636"),i("2877")),s=Object(h["a"])(d,n,o,!1,null,"4644ef47",null);e["default"]=s.exports},d636:function(t,e,i){"use strict";i("50a3")}}]);
//# sourceMappingURL=chunk-d578b34c.adf6e065.js.map