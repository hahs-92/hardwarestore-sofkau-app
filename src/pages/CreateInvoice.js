import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
//actions
import {  createInvoice } from '../actions/invoicesActions'

export const CreateInvoice = () => {
    const [sellerInfo, setSellerInfo] = useState({ citizenshipCard: "", fullName: ""})
    const [clientInfo, setClientInfo] = useState({citizenshipCard:"", fullName: "", phoneNumber: ""})
    const listProductsToCreate = useSelector(state => state.products.listProductsToCreate)

    const handleSellerInfo = (e) => {
        setSellerInfo({
            ...sellerInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleClientInfo = (e) => {
        setClientInfo({
            ...setClientInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const data = {
            date: Date.now(),
            client: clientInfo,
            seller: sellerInfo,
            products: listProductsToCreate
        }
        //crear factura
        //limpiar list products
        console.log(data)
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
                            value={sellerInfo.fullName}
                            onChange={handleClientInfo}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Numero Cedula"
                            name="citizenshipCard"
                            value={sellerInfo.citizenshipCard}
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
                    </div>
                    <input type="submit" value="Send" />
                </form>
            </section>
        </main>
    )
}
