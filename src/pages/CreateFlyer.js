import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
//actions
import { createFlyer } from '../actions/flyersActions'
import { cleanProductToList } from '../actions/productActions'
//hlpers
import { getDateFormat } from '../helpers/date'

export const CreateFlyer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listProductsToCreate = useSelector(state => state.products.listProductsToCreate)
    const [supplierInfo, setSupplierInfo] = useState(listProductsToCreate[0]?.supplier)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        listProductsToCreate.forEach(element => {
            delete element.supplier
        })

        dispatch(createFlyer({
            date: getDateFormat(),
            products: listProductsToCreate,
            supplier: supplierInfo
        }))

        dispatch(cleanProductToList())
        setSupplierInfo(null)
        navigate("/flyers")
    }

    return (
        <main className="my-16 flex justify-center">
            <section className="w-full max-w-sm">
                <article className="p-5 bg-orange-50 shadow-lg text-slate-900">
                    <h3>Date: <span className="px-3 text-gray-700">{ getDateFormat() }</span></h3>

                    <div>
                        <h4>Supplier: <span className="px-3 text-gray-700">{ listProductsToCreate[0]?.supplier.fullName}</span></h4>
                        <h3>Products:</h3>
                        <section className="w-full grid grid-cols-3 text-slate-500">
                            <span>Name</span>
                            <span>Price</span>
                            <span>Quantity</span>
                        </section>
                        {
                            listProductsToCreate.length && listProductsToCreate.map(p => (
                                <article
                                    className="grid grid-cols-3"
                                    key={p.name}
                                >
                                    <h4>{ p.name}</h4>
                                    <h4>{ p.price}</h4>
                                    <h4>{ p.quantity}</h4>
                                </article>
                            ))
                        }
                    </div>
                    <div className="my-6">
                        <button
                            className="h-11 w-full bg-orange-500 text-white rounded"
                            onClick={handleOnSubmit}
                        >Create</button>
                    </div>
                </article>
            </section>
        </main>
    )
}
