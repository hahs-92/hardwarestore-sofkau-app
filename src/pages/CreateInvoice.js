import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router'
//actions
import {  createInvoice } from '../actions/invoicesActions'
import { cleanProductToSelectList } from '../actions/productActions'
//helpers
import { getDateFormat } from '../helpers/date'

export const CreateInvoice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sellerInfo, setSellerInfo] = useState({ citizenshipCard: "", fullName: "", phoneNumber: ""})
    const [clientInfo, setClientInfo] = useState({citizenshipCard:"", fullName: "", phoneNumber: ""})
    const listProductsToCreate = useSelector(state => state.products.listProductsToCreate)
    const listProductsToSell = useSelector(state => state.products.listProductsToSell)

    const getTotal = () => {
        return listProductsToSell.reduce((acum, p)=>  (p.quantityToSell * p.price) + acum,0)
    }


    const handleSellerInfo = (e) => {
        setSellerInfo({
            ...sellerInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleClientInfo = (e) => {
        setClientInfo({
            ...clientInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let products

        if(listProductsToSell.length) {
            products = listProductsToSell.map(p => {
                p.quantity = p.quantityToSell
                return p
            })
        }

        const data = {
            date: getDateFormat(),
            client: clientInfo,
            seller: sellerInfo,
            products: (listProductsToCreate.length) ? listProductsToCreate : products
        }

        dispatch(createInvoice(data))
        cleanProductToSelectList()
        navigate("/sellers")
    }


    return (
        <main>
            <section>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <span>Datos del Cliente</span>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            name="fullName"
                            value={clientInfo.fullName}
                            onChange={handleClientInfo}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Numero Cedula"
                            name="citizenshipCard"
                            value={clientInfo.citizenshipCard}
                            onChange={handleClientInfo}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Telefono"
                            name="phoneNumber"
                            value={clientInfo.phoneNumber}
                            onChange={handleClientInfo}
                            required
                        />
                    </div>
                    <div>
                        <span>Datos del Vendedor</span>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            name="fullName"
                            value={sellerInfo.fullName}
                            onChange={handleSellerInfo}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Numero Cedula"
                            name="citizenshipCard"
                            value={sellerInfo.citizenshipCard}
                            onChange={handleSellerInfo}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Telefono"
                            name="phoneNumber"
                            value={sellerInfo.phoneNumber}
                            onChange={handleSellerInfo}
                            required
                        />
                    </div>
                    <div>
                        <p>Total: ${ getTotal() }</p>
                    </div>
                    <input type="submit" value="Send" />
                </form>
            </section>
        </main>
    )
}
