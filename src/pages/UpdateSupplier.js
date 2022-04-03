import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//actions
import { getSupplier, updateSupplier } from '../actions/supplierActions'

export const UpdateSupplier = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    setSupplierData({id: null,citizenshipCard: "", fullName: "", phoneNumber: "", email: ""})
    navigate("/suppliers")
  }

  useEffect(() => {
    dispatch(getSupplier(id))
  },[id])


  return (
    <main>
      <section>
        <form onSubmit={handleOnSubmit} >
            <input
                type="text"
                placeholder="Cedula"
                name="citizenshipCard"
                value={supplierData.citizenshipCard}
                onChange={handleOnChange}
                readOnly
            />
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
            <input type="submit" value="Update Supplier" />
        </form>
      </section>
    </main>
  )
}
