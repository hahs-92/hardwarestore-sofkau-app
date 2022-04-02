//types
import { productsType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    products: [],
    product: {},
    listProductsToCreate:[]
}

export const productReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case productsType.GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: action.payload
            }
        case productsType.GET_PRODUCT:
            return {
                ...state,
                loading: false,
                error: false,
                product: action.payload
            }
        case productsType.ADD_PRODUCT_TO_LIST:
            return {
                ...state,
                listProductsToCreate: [...state.listProductsToCreate, action.payload]
            }
        case productsType.REMOVE_PRODUCT_TO_LIST:
            return {
                ...state,
                listProductsToCreate: state.listProductsToCreate
                    .filter(p => p.name !== action.payload)
            }
        case productsType.CLEAN_PRODUCT_TO_LIST:
            return {
                ...state,
                listProductsToCreate: []
            }
        case productsType.CREATE_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: [...state.products, action.payload]
            }

        default:
            return state
    }
}
