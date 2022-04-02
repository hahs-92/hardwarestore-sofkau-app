import { useState } from 'react'
import { useDispatch } from 'react-redux'
//actions
import { createSupplier } from '../actions/supplierActions'

export const CreateSupplier = () => {
  const dispatch = useDispatch()
  const [supplierData, setSupplierData] = useState({fullName: "", phoneNumber: "", email: ""})

  const handleOnChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(createSupplier(supplierData))
    setSupplierData({fullName: "", phoneNumber: "", email: ""})
  }

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
