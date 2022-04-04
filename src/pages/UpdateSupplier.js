import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//actions
import { getSupplier, updateSupplier } from '../actions/supplierActions'

export const UpdateSupplier = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const supplier = useSelector(state => state.suppliers.supplier)
  const [supplierData, setSupplierData] = useState({id: null,citizenshipCard: "", fullName: "", phoneNumber: "", email: ""})

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

  useEffect(() => {
    setSupplierData(supplier)
  },[supplier])

  console.log("ddd")

  return (
    <main className="flex justify-center my-20">
      <section className="p-4 w-full max-w-md bg-orange-50 shadow-lg">
        <form
          className="flex flex-col w-full"
          onSubmit={handleOnSubmit}
        >
            <label
              className="text-slate-500"
              htmlFor="citizenshipCard">CitizenshipCard:</label>
            <input
                className="w-full h-11 my-1 px-1"
                type="text"
                placeholder="Cedula"
                name="citizenshipCard"
                value={supplierData.citizenshipCard}
                onChange={handleOnChange}
                readOnly
            />
            <label
              className="text-slate-500"
              htmlFor="fullNanme"
            >Full Name:</label>
            <input
              className="w-full h-11 my-1 px-1"
              type="text"
              placeholder="Nombre Completo"
              name="fullName"
              value={supplierData.fullName}
              onChange={handleOnChange}
              required
            />
            <label
              className="text-slate-500"
              htmlFor="phoneNumber">Phone Number:</label>
            <input
              className="w-full h-11 my-1 px-1"
              type="text"
              placeholder="Numero Telefonico"
              name='phoneNumber'
              value={supplierData.phoneNumber}
              onChange={handleOnChange}
              required
            />
            <label
              className="text-slate-500"
              htmlFor="email">Email:</label>
            <input
              className="w-full h-11 my-1 px-1"
              type="email"
              placeholder="Email"
              name='email'
              value={supplierData.email}
              onChange={handleOnChange}
              required
            />
            <input
              className="w-full h-11 my-4 px-1 text-white bg-orange-500 rounded-sm cursor-pointer"
              type="submit"
              value="Update Supplier"
            />
        </form>
      </section>
    </main>
  )
}
