//types
import { flyersType } from '../types'


export const getFlyers = () => async(dispatch) => {
    dispatch({ type: flyersType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/flyers`)
        const flyers = await resp.json()

        dispatch({
            type: flyersType.GET_FLYERS,
            payload: flyers
        })
    } catch(e) {
        dispatch({ type: flyersType.ERROR })
    }
}

export const getFlyer = (flyerId) => async(dispatch) => {
    dispatch({ type: flyersType.LOADING })

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/flyers/${flyerId}`)
        const flyer = await resp.json()

        dispatch({
            type: flyersType.GET_FLYER,
            payload: flyer
        })
    } catch(e) {
        dispatch({ type: flyersType.ERROR })
    }
}

export const createFlyer = (flyerData) => async(dispatch) => {
    dispatch({ type: flyersType.LOADING })
    console.log("test: ", flyerData)

    try {
        const resp = await fetch(`https://hardwarestore-sofkau.herokuapp.com/api/v1/flyers`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flyerData)
        })
        const flyer = await resp.json()

        dispatch({
            type: flyersType.CREATE_FLYER,
            payload: flyer
        })
    } catch(e) {
        console.log("error: ", e.message)
        dispatch({ type: flyersType.ERROR })
    }
}