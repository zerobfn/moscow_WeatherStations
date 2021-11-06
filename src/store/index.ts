import Vue from 'vue'
import Vuex from 'vuex'

import MapModule from './modules/map'
import GeneralModule from './modules/general'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        MapModule,
        GeneralModule
    }
})
