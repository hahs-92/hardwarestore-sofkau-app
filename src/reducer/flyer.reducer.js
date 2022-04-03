//types
import { flyersType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    flyers: [],
    flyer: {}
}

export const flyerReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case flyersType.GET_FLYERS:
            return {
                ...state,
                error: null,
                loading: false,
                flyers: action.payload
            }
        case flyersType.GET_FLYER:
            return {
                ...state,
                error: null,
                loading: false,
                flyer: action.payload
            }
        case flyersType.CREATE_FLYER:
            return {
                ...state,
                error: null,
                loading: false,
                flyers: [...state.flyers, action.payload]
            }

        default:
            return state
    }
}