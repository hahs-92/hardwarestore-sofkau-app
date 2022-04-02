//types
import { productsType } from '../types'


export const getProducts = () => async(dispatch) => {
    dispatch({type: productsType.LOADING})

    try {
        const resp = await fetch("https://hardwarestore-sofkau.herokuapp.com/api/v1/products")
        const products = await resp.json()

        dispatch({
            type: productsType.GET_PRODUCTS,
            payload: products
        })
    } catch(e) {
        dispatch({type: productsType.ERROR})
    }
}

export const getProduct = (productId) => async(dispatch) => {
    dispatch({type: productsType.LOADING})

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/products/${productId}`)
        const product = await resp.json()

        dispatch({
            type: productsType.GET_PRODUCT,
            payload: product
        })
    } catch(e) {
        dispatch({type: productsType.ERROR})
    }
}


export const createProducts = (productsToCreate) => async(dispatch) => {
    dispatch({type: productsType.LOADING})

    try {
        //const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/products/createAll`)
        //const products = await resp.json()

        dispatch({
            type: productsType.CREATE_PRODUCTS,
            payload: productsToCreate
        })
    } catch(e) {
        dispatch({type: productsType.ERROR})
    }
}

export const updateProduct = (productsToUpdate) => async(dispatch) => {
    dispatch({type: productsType.LOADING})

    try {
        //const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/products/createAll`)
        //const products = await resp.json()

        dispatch({
            type: productsType.UPDATE_PRODUCT,
            payload: productsToUpdate
        })
    } catch(e) {
        dispatch({type: productsType.ERROR})
    }
}

//agregar a un producto a la lista de productos a crear
export const addProductToList = (productData) => async(dispatch) => {
    dispatch({
        type: productsType.ADD_PRODUCT_TO_LIST,
        payload: productData
    })
}


export const cleanProductToList = () => async(dispatch) => {
    dispatch({
        type: productsType.CLEAN_PRODUCT_TO_LIST
    })
}


export const removeProductToList = (productName) => async(dispatch) => {
    dispatch({
        type: productsType.REMOVE_PRODUCT_TO_LIST,
        payload: productName
    })
}


export const deleteProduct = (productId) => async(dispatch) => {
    dispatch({type: productsType.LOADING})

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/products/${productId}`)
        const product = await resp.json()

        dispatch({
            type: productsType.GET_PRODUCT,
            payload: product
        })
    } catch(e) {
        dispatch({type: productsType.ERROR})
    }
}

