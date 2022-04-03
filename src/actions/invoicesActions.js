//types
import { invoicesType } from '../types'


export const getInvoices = () => async(dispatch) => {
    dispatch({ type: invoicesType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/invoices`)
        const invoices = await resp.json()

        dispatch({
            type: invoicesType.GET_INVOICES,
            payload: invoices
        })
    } catch(e) {
        dispatch({ type: invoicesType.ERROR })
    }
}

export const getInvoice = (invoiceId) => async(dispatch) => {
    dispatch({ type: invoicesType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/invoices/${invoiceId}`)
        const invoice = await resp.json()

        dispatch({
            type: invoicesType.GET_INVOICES,
            payload: invoice
        })
    } catch(e) {
        dispatch({ type: invoicesType.ERROR })
    }
}

export const createInvoice = (invoiceData) => async(dispatch) => {
    dispatch({ type: invoicesType.LOADING })

    try {
        //todo post
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/invoices`)
        const invoice = await resp.json()

        dispatch({
            type: invoicesType.CREATE_INVOICE,
            payload: invoice
        })
    } catch(e) {
        dispatch({ type: invoicesType.ERROR })
    }
}