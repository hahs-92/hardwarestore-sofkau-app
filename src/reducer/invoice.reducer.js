//types
import { invoicesType} from '../types'

//initialState
export const INITAL_STATE = {
    error: null,
    loading: false,
    invoices: []
}

export const invoiceReducer = (state=INITAL_STATE, action) => {
    switch (action.type) {
        case invoicesType.GET_INVOICES:
            return {
                ...state,
                invoices: action.payload
            }

        default:
            return state
    }
}
