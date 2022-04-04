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
    <main className='flex justify-center my-14 w-full min-h'>
      <section className='flex my-20 w-full max-w-sm shadow-lg bg-orange-50'>
        <form
          className='flex flex-col px-4 py-8 w-full'
          onSubmit={handleOnSubmit}
        >
            <input
              className='w-full h-11 my-1'
              type="text"
              placeholder="Cedula"
              name="citizenshipCard"
              value={supplierData.citizenshipCard}
              onChange={handleOnChange}
              required
            />
            <input
              className='w-full h-11 my-1'
              type="text"
              placeholder="Nombre Completo"
              name="fullName"
              value={supplierData.fullName}
              onChange={handleOnChange}
              required
            />
            <input
              className='w-full h-11 my-1'
              type="text"
              placeholder="Numero Telefonico"
              name='phoneNumber'
              value={supplierData.phoneNumber}
              onChange={handleOnChange}
              required
            />
            <input
              className='w-full h-11 my-1'
              type="email"
              placeholder="Email"
              name='email'
              value={supplierData.email}
              onChange={handleOnChange}
              required
            />
            <input
              className='w-full h-11 my-4 text-white rounded-sm bg-orange-500'
              type="submit"
              value={`${loading ? "loading..." : "Add "}`}
              />
        </form>
      </section>
    </main>
  )
}
