//types
import { suppliersType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    suppliers: [],
    supplier: {}
}

export const supplierReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case suppliersType.GET_SUPPLIERS:
            return {
                ...state,
                error: false,
                loading: false,
                suppliers: action.payload
            }
        case suppliersType.GET_SUPPLIER:
            return {
                ...state,
                error: false,
                loading: false,
                supplier: action.payload
            }
        case suppliersType.CREATE_SUPPLIER:
            return {
                ...state,
                error: false,
                loading: false,
                suppliers: [...state.suppliers, action.payload]
            }
        case suppliersType.UPDATE_SUPPLIER:
            return {
                ...state,
                error: false,
                loading: false,
                suppliers: state.suppliers.map(s => s.id === action.payload.id ? action.payload : s )
            }
        case suppliersType.DELETE_SUPPLIER:
            return {
                ...state,
                error: false,
                loading: false,
                suppliers: state.suppliers.filter(s => s.id !== action.payload)
            }

        default:
            return state
    }
}
