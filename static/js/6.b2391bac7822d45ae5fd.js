webpackJsonp([6],{"g/TT":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("teIl"),a=n("k3dr"),i={data:function(){return{currentRoute:"",routeList:a.a}},watch:{$route:function(t){this.setCurrentRouteName(t&&t.name)}},components:{Header:s.a},computed:{},created:function(){this.setCurrentRouteName(this.$route.name)},methods:{setCurrentRouteName:function(t){this.currentRoute=this.currentRoute=t}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"config-wrap"},[n("Header",[n("div",{staticClass:"back"},[n("router-link",{attrs:{to:{name:"Main"}}},[t._v("首页")])],1)]),n("div",{staticClass:"config-body"},[n("div",{staticClass:"aside"},[n("ul",{staticClass:"config-list"},t._l(t.routeList,function(e,s){return n("li",{key:s,staticClass:"config-item",class:{select:e.name===t.currentRoute}},[n("router-link",{attrs:{to:{name:e.name}}},[n("div",{staticClass:"link"},[t._v(t._s(e.meta.title))])])],1)}))]),n("div",{staticClass:"content"},[n("router-view")],1)])],1)},staticRenderFns:[]};var u=n("VU/8")(i,r,!1,function(t){n("nMCq")},"data-v-23005fb9",null);e.default=u.exports},nMCq:function(t,e){}});
//# sourceMappingURL=6.b2391bac7822d45ae5fd.js.map