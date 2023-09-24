
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
// import VConsole from "vconsole";
// new VConsole()

Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
