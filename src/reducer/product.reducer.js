//types
import { productsType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    products: []
}

export const productReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case productsType.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        default:
            return state
    }
}
