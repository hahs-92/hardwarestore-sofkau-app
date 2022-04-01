//types
import { productsType } from '../types'


export const getProducts = (query) => async(dispatch) => {
    //loading

    try {
        //fectch

        dispatch({
            type: productsType.GET_PRODUCTS,
            payload: [{ name: "testing"}]
        })
    } catch(e) {
        //error
    }
}