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
        <main className="flex justify-center my-16">
            <section className="p-8 w-full max-w-md bg-orange-50 shadow-lg">
                <form
                className="flex flex-col"
                    onSubmit={handleOnSubmit}
                >
                    <div className="my-1 flex flex-col">
                        <span>Datos del Cliente</span>
                        <input
                            className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Nombre completo"
                            name="fullName"
                            value={clientInfo.fullName}
                            onChange={handleClientInfo}
                            required
                        />
                        <input
                             className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Numero Cedula"
                            name="citizenshipCard"
                            value={clientInfo.citizenshipCard}
                            onChange={handleClientInfo}
                            required
                        />
                        <input
                             className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Telefono"
                            name="phoneNumber"
                            value={clientInfo.phoneNumber}
                            onChange={handleClientInfo}
                            required
                        />
                    </div>
                    <div className="my-1 flex flex-col">
                        <span>Datos del Vendedor</span>
                        <input
                             className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Nombre completo"
                            name="fullName"
                            value={sellerInfo.fullName}
                            onChange={handleSellerInfo}
                            required
                        />
                        <input
                            className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Numero Cedula"
                            name="citizenshipCard"
                            value={sellerInfo.citizenshipCard}
                            onChange={handleSellerInfo}
                            required
                        />
                        <input
                            className="my-1 px-1 h-11"
                            type="text"
                            placeholder="Telefono"
                            name="phoneNumber"
                            value={sellerInfo.phoneNumber}
                            onChange={handleSellerInfo}
                            required
                        />
                    </div>
                    <div className="my-1">
                        <p>Total: $ <span className="mx-3 text-gray-700">{ getTotal() }</span></p>
                    </div>
                    <input
                        className="my-1 px-1 h-11 bg-orange-500 rounded text-white cursor-pointer"
                        type="submit"
                        value="Create Invoice"
                    />
                </form>
            </section>
        </main>
    )
}
