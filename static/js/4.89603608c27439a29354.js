webpackJsonp([4],{"2pys":function(e,r){},P7ry:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t("//Fk"),a=t.n(s),o=t("L6bb"),n=t.n(o),i=t("lbHh"),l=t.n(i),u=t("Ea+1"),d=t("A/UQ"),c=t("+sZq"),m={name:"Login",components:{Header:t("teIl").a},data:function(){return{form:{userName:"",password:""},loading:!1,rules:{userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},computed:{passwordType:function(){return this.showPassword?"":"password"},btnDisable:function(){var e=this.form,r=e.userName,t=e.password;return!r||!t}},created:function(){document.addEventListener("keyup",this.enterLogin)},beforeDestroy:function(){document.removeEventListener("keyup",this.enterLogin)},methods:{enterLogin:function(e){e&&13===e.keyCode&&!this.btnDisable&&this.login()},login:function(){var e=this;this.$refs.form.validate(function(r){if(!r)return!1;e.loading=!0,e.showPassword=!1,u.a.login.doLogin({userName:e.form.userName,password:n()(e.form.password)}).then(function(r){var t=r.data;if(e.loading=!1,!t||!t.success)return a.a.reject(t.message);l.a.set("token",t.data,{expires:1*d.e.tokenValidTime/24}),e.$router.push({name:"Main"})}).catch(function(r){e.loading=!1;var t=r&&Object(c.c)(r)?r:"登录失败,请检查网络重新尝试~";e.$message({message:t,type:"error",center:!0})})})},resetForm:function(){this.$refs.form.resetFields()}}},f={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-wrap",attrs:{id:"target"}},[t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("span",[e._v("用户登录")])]),t("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"100px"}},[t("el-form-item",{attrs:{prop:"userName",label:"用户名："}},[t("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.form.userName,callback:function(r){e.$set(e.form,"userName",r)},expression:"form.userName"}})],1),t("el-form-item",{attrs:{prop:"password",label:"密码："}},[t("el-input",{attrs:{type:"password",placeholder:"请输入密码"},on:{keyup:function(r){return"button"in r||!e._k(r.keyCode,"enter",13,r.key,"Enter")?e.login(r):null}},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),t("el-form-item",{attrs:{align:"left"}},[t("el-button",{attrs:{disabled:e.btnDisable,type:"primary",loading:e.loading},on:{click:e.login}},[e._v("立即登录")]),t("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)],1)},staticRenderFns:[]};var p=t("VU/8")(m,f,!1,function(e){t("2pys")},"data-v-26959330",null);r.default=p.exports}});
//# sourceMappingURL=4.89603608c27439a29354.js.map