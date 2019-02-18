import "@/style/reset.scss";

import Vue from "vue";


// import store from "@/vue/store";
// import router from "@/vue/router";


import wrap from "./vue/wrap";


new Vue({
	el : "#wrap",
	// store,
	// router,
	render : createElement => createElement(wrap)
});