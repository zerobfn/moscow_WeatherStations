import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

import BaseIcon from '@/components/BaseIcon.vue'

Vue.config.productionTip = false

Vue.use(VueLayers)
Vue.component('BaseIcon', BaseIcon)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
