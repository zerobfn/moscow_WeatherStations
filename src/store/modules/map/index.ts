import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { GetterNames, ActionNames, MutationNames } from '../../types'
import { Mutation } from './types'
// const MOSCOW_CENTER = [37.624390, 55.753410]
const MOSCOW_CENTER = [4188327.94, 7509482.36]
const states = {
    layerType: 'google',
    mapData: {
        zoom: 10,
        center: MOSCOW_CENTER,
        MAX_ZOOM: 20,
        MIN_ZOOM: 6
    },
    station: null
}

export type IState = typeof states

const actions: ActionTree<IState, any> = {
}

const mutations: MutationTree<IState> = {
    [MutationNames.changeLayerType](state, val: string) {
        state.layerType = val
    },

    [MutationNames.setStation](state, val: any) {
        state.station = val
    },

    [MutationNames.incZoom](state) {
        const zoom = state.mapData.zoom
        state.mapData.zoom = zoom >= state.mapData.MAX_ZOOM ? state.mapData.MAX_ZOOM : (zoom + 0.5)
    },

    [MutationNames.decZoom](state) {
        const zoom = state.mapData.zoom
        state.mapData.zoom = zoom <= state.mapData.MIN_ZOOM ? state.mapData.MIN_ZOOM : (zoom - 0.5)
    }
}

const getters: GetterTree<IState, any> = {
    [GetterNames.getLayerType]: state => {
        return state.layerType
    },

    [GetterNames.getMapData]: state => {
        return state.mapData
    },

    [GetterNames.getStation]: state => {
        return state.station
    }
}

const map: Module<IState, any> = {
    state: states,
    actions,
    mutations,
    getters
}

export default map