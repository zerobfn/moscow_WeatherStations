import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { GetterNames, ActionNames, MutationNames } from '../../types'

const states = {
}

export type IState = typeof states

const actions: ActionTree<IState, any> = {
}

const mutations: MutationTree<IState> = {
}

const getters: GetterTree<IState, any> = {
}

const general: Module<IState, any> = {
    state: states,
    actions,
    mutations,
    getters
}

export default general