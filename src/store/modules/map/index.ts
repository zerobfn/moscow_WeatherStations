import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { GetterNames, ActionNames, MutationNames } from '../../types'
// const MOSCOW_CENTER = [37.624390, 55.753410]
const MOSCOW_CENTER = [4188327.94, 7509482.36]
const states = {
    layerType: 'google',
    mapData: {
        zoom: 10,
        center: MOSCOW_CENTER,
        MAX_ZOOM: 20,
        MIN_ZOOM: 5
    }
}

export type IState = typeof states

const actions: ActionTree<IState, any> = {
}

const mutations: MutationTree<IState> = {
    [MutationNames.changeLayerType](state, val: string) {
        state.layerType = val
    }
}

const getters: GetterTree<IState, any> = {
    [GetterNames.getLayerType]: state => {
        return state.layerType
    },

    [GetterNames.getMapData]: state => {
        return state.mapData
    }
}

const map: Module<IState, any> = {
    state: states,
    actions,
    mutations,
    getters
}

export default map