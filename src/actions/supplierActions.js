//types
import { suppliersType } from '../types'


export const getSuppliers = (query) => async(dispatch) => {
    //loading

    try {
        //fectch

        dispatch({
            type: suppliersType.GET_SUPPLIERS,
            payload: [{ name: "testing suplier"}]
        })
    } catch(e) {
        //error
    }
}