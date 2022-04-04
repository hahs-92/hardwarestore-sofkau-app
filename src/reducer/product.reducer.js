//types
import { productsType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    products: [],
    product: {},
    listProductsToCreate:[],
    listProductsToSell: []
}

export const productReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case productsType.ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case productsType.LOADING:
            return {
                ...state,
                loading: true,
            }
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
        case productsType.ADD_PRODUCT_TO_SELECT_LIST:
            return {
                ...state,
                listProductsToSell: [...state.listProductsToSell, action.payload]
            }
        case productsType.REMOVE_PRODUCT_TO_SELECT_LIST:
            return {
                ...state,
                listProductsToSell: state.listProductsToSell
                    .filter(p => p.name !== action.payload)
            }
        case productsType.CLEAN_SELECT_LIST:
            return {
                ...state,
                listProductsToSell: []
            }
        case productsType.CREATE_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: [...state.products, action.payload]
            }
        case productsType.UPDATE_PRODUCT:
            return {
                ...state,
                loading: false,
                error: false,
                products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
            }
        case productsType.UPDATE_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: [...state.products, ]
            }
        case productsType.DELETE_PRODUCT:
            return {
                ...state,
                error: null,
                loading: false,
                products: state.products.filter(p => p.id !== action.payload)
            }

        default:
            return state
    }
}
