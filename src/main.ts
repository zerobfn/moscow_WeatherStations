import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

import OutsideClickDirective from '@/directives/OutsideClick'
import BaseIcon from '@/components/BaseIcon.vue'
import Ratiobox from '@/components/Ratiobox.vue'
import BaseSelectBox from '@/components/BaseSelectBox.vue'

Vue.config.productionTip = false

Vue.use(VueLayers)
Vue.component('BaseIcon', BaseIcon)
Vue.component('Ratiobox', Ratiobox)
Vue.component('BaseSelectBox', BaseSelectBox)
Vue.directive('outside-click', OutsideClickDirective)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
