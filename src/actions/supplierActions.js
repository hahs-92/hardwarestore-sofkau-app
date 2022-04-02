//types
import { suppliersType } from '../types'


export const getSuppliers = () => async(dispatch) => {
    dispatch({ type: suppliersType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/suppliers`)
        const suppliers = await resp.json()

        dispatch({
            type: suppliersType.GET_SUPPLIERS,
            payload: suppliers
        })
    } catch(e) {
        dispatch({ type: suppliersType.ERROR })
    }
}


export const getSupplier = (supplierId) => async(dispatch) => {
    dispatch({ type: suppliersType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/suppliers/${supplierId}`)
        const supplier = await resp.json()

        dispatch({
            type: suppliersType.GET_SUPPLIER,
            payload: supplier
        })
    } catch(e) {
        dispatch({ type: suppliersType.ERROR })
    }
}

export const createSupplier = (supplierData) => async(dispatch) => {
    dispatch({ type: suppliersType.LOADING })

    try {
        //todo
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/suppliers`)
        const supplier = await resp.json()

        dispatch({
            type: suppliersType.CREATE_SUPPLIER,
            payload: supplier
        })
    } catch(e) {
        dispatch({ type: suppliersType.ERROR })
    }
}

export const updateSupplier = (supplierData) => async(dispatch) => {
    dispatch({ type: suppliersType.LOADING })

    try {
        //todo
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/suppliers`)
        const supplier = await resp.json()

        dispatch({
            type: suppliersType.UPDATE_SUPPLIER,
            payload: supplier
        })
    } catch(e) {
        dispatch({ type: suppliersType.ERROR })
    }
}

export const deleteSupplier = (supplierId) => async(dispatch) => {
    dispatch({ type: suppliersType.LOADING })

    try {
        //todo
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/suppliers/${supplierId}`)
        const supplier = await resp.json()

        dispatch({
            type: suppliersType.DELETE_SUPPLIER,
            payload: supplierId
        })
    } catch(e) {
        dispatch({ type: suppliersType.ERROR })
    }
}