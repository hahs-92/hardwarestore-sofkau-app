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
        <main>
            <section>
                <article>
                    <h3>Date: { getDateFormat() }</h3>

                    <div>
                        <h3>Products:</h3>
                        <h4>Supplier: { listProductsToCreate[0]?.supplier.fullName}</h4>
                        {
                            listProductsToCreate.length && listProductsToCreate.map(p => (
                                <article key={p.name}>
                                    <h4>Name: { p.name}</h4>
                                    <h4>Price: { p.price}</h4>
                                    <h4>Quantity: { p.quantity}</h4>
                                </article>
                            ))
                        }
                    </div>
                    <button onClick={handleOnSubmit}>Create</button>
                </article>
            </section>
        </main>
    )
}
