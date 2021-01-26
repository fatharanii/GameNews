import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery'
import App from './App.vue'
import http from './http'
import vuetify from './plugins/vuetify';
import router from './plugins/router'

import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
    id: 'UA-185807551-1',
    router
})

Vue.config.productionTip = false
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http

new Vue({
router,
vuetify,
render: h => h(App)
}).$mount('#app')