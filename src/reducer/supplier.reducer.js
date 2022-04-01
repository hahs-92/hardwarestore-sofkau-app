//types
import { suppliersType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    suppliers: []
}

export const supplierReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case suppliersType.GET_SUPPLIERS:
            return {
                ...state,
                suppliers: action.payload
            }

        default:
            return state
    }
}
