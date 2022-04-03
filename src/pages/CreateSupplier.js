import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//actions
import { createSupplier } from '../actions/supplierActions'

export const CreateSupplier = () => {
  const dispatch = useDispatch()
  const [supplierData, setSupplierData] = useState({citizenshipCard: "",fullName: "", phoneNumber: "", email: ""})
  const loading = useSelector(state => state.suppliers.loading)

  const handleOnChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(createSupplier(supplierData))
    setSupplierData({citizenshipCard: "",fullName: "", phoneNumber: "", email: ""})
  }

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
            required
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
          <input type="submit" value={`${loading ? "loading..." : "Add "}`} />
      </form>
    </section>
  </main>
  )
}
