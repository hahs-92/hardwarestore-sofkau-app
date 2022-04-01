//types
import { invoicesType } from '../types'


export const getInvoices = (query) => async(dispatch) => {
    //loading

    try {
        //fectch

        dispatch({
            type: invoicesType.GET_INVOICES,
            payload: [{ name: "testing invoices"}]
        })
    } catch(e) {
        //error
    }
}