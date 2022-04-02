import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//actions
import { getSupplier, updateSupplier } from '../actions/supplierActions'

export const UpdateSupplier = () => {
  const dispatch = useDispatch()
  const supplier = useSelector(state => state.suppliers.supplier)
  const [supplierData, setSupplierData] = useState(supplier)
  const {id} = useParams()

  const handleOnChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(updateSupplier(supplierData))
    setSupplierData({id: null, fullName: "", phoneNumber: "", email: ""})
  }

  useEffect(() => {
    if(id) getSupplier(id)
  },[id])

  return (
    <main>
      <section>
        <form onSubmit={handleOnSubmit} >
            <input
              type="text"
              placeholder="Nombre Completo"
              name="fullName"
              value={supplierData.fullName}
              onChange={handleOnChange}
              required
            />
            <input
              type="text"
              placeholder="Numero Telefonico"
              name='phoneNumber'
              value={supplierData.phoneNumber}
              onChange={handleOnChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={supplierData.email}
              onChange={handleOnChange}
              required
            />
            <input type="submit" value="Add Supplier" />
        </form>
      </section>
    </main>
  )
}
