import {
    Action as MapActions,
    Mutation as MapMutaions,
    Getter as MapGetters
} from './modules/map/types'

import {
    Action as GeneralActions,
    Mutation as GeneralMutaions,
    Getter as GeneralGetters
} from './modules/general/types'

export const ActionNames = {
    ...MapActions,
    ...GeneralActions
}

export const MutationNames = {
    ...MapMutaions,
    ...GeneralMutaions
}

export const GetterNames = {
    ...MapGetters,
    ...GeneralGetters
}