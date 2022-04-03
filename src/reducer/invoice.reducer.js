//types
import { invoicesType } from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    invoices: [],
    invoice: {}
}

export const invoiceReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case invoicesType.GET_INVOICES:
            return {
                ...state,
                error: null,
                loading: false,
                invoices: action.payload
            }
        case invoicesType.GET_INVOICE:
            return {
                ...state,
                error: null,
                loading: false,
                invoice: action.payload
            }
        case invoicesType.CREATE_INVOICE:
            return {
                ...state,
                error: null,
                loading: false,
                invoices: [...state.invoices, action.payload]
            }


        default:
            return state
    }
}
