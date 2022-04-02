//types
import { productsType } from '../types'


export const getProducts = (query) => async(dispatch) => {
    //loading

    try {
        const resp = await fetch("https://hardwarestore-sofkau.herokuapp.com/api/v1/products")
        const products = await resp.json()

        dispatch({
            type: productsType.GET_PRODUCTS,
            payload: products
        })
    } catch(e) {
        //error
    }
}