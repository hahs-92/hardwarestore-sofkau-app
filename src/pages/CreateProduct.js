import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
//actions
import { addProductToList, removeProductToList, createProducts } from '../actions/productActions'
import { getSuppliers } from '../actions/supplierActions'

export const CreateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ productInfo, setProductInfo] = useState({ name:"", price:"", quantity:"", limit:""})
  const [ supplierSelect, setSupplierSelect] = useState(null)
  const [ warn, setWarn ] = useState(null)
  const listProductsToCreate = useSelector(state => state.products.listProductsToCreate)
  const suppliers = useSelector(state => state.suppliers.suppliers)

  const options = suppliers.map(s => {
    return {
      value: s.fullName,
      label: s.fullName
    }
  })

  const handleOnChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateProducts = () => {
    if(!listProductsToCreate.length) {
      return false
    }
    dispatch(createProducts(listProductsToCreate))
    navigate("/flyers/create")
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(!supplierSelect) {
      console.log("queee")
      setWarn("Debes elegir un Proveedor")
      return
    }

    if(productInfo.limit < productInfo.quantity) {
      setWarn("El limite esta alcanzado!")
      return
    }

    dispatch(addProductToList(
      {
        ...productInfo,
        price: parseInt(productInfo.price), //parseFloat?
        quantity: parseInt(productInfo.quantity),
        limit: parseInt(productInfo.limit),
        supplier: suppliers.find(s => s.fullName === supplierSelect.value)
      }
    ))
    setProductInfo({ name:"", price:"", quantity:"", limit:""})
    setWarn(null)
  }

  useEffect(() => {
    dispatch(getSuppliers())
  },[])


  return (
    <main className='flex justify-center w-full min-h'>
      <div className='flex my-20 w-full max-w-4xl shadow-lg' >
        <section className='p-2 w-2/5 h-ful' >
          <form
            className='w-full flex flex-col'
            onSubmit={handleOnSubmit}
          >
              {
                suppliers.length
                  ?  <Select
                      defaultValue={supplierSelect}
                      onChange={setSupplierSelect}
                      options={ options}
                      required
                    />
                  : <span>No tienes ningun proveedor</span>
              }
              <input
                className='h-11 my-1 px-1'
                type="text"
                placeholder="Nombre"
                name="name"
                value={productInfo.name}
                onChange={handleOnChange}
                required
              />
              <input
                className='h-11 my-1 px-1'
                type="number"
                placeholder="Precio"
                name='price'
                value={productInfo.price}
                onChange={handleOnChange}
                required
              />
              <input
                className='h-11 my-1 px-1'
                type="number"
                placeholder="Cantidad"
                name='quantity'
                value={productInfo.quantity}
                onChange={handleOnChange}
                required
              />
              <input
                className='h-11 my-1 px-1'
                type="number"
                placeholder="Limit"
                name='limit'
                value={productInfo.limit}
                onChange={handleOnChange}
                required
              />
              <input
                className='h-11 my-1 px-1 bg-orange-500 rounded-sm text-white cursor-pointer'
                type="submit"
                value="Add Product"
              />
          </form>
        </section>

        <section className='flex flex-col items-center justify-between p-2 w-3/5 h-full'>
          {
            listProductsToCreate.length && listProductsToCreate.map(p => (
              <article
                className='flex justify-between items-center px-2 w-full max-w-xs h-12 shadow-lg'
                key={p.name}
              >
                <section className='flex justify-between w-10/12'>
                  <span>{p.name}</span>
                  <span>{p.price}</span>
                  <span>{p.quantity}</span>
                </section>
                <section className=' w-1/12'>
                  <button
                    className='flex justify-around w-full'
                    onClick={() => dispatch(removeProductToList(p.name))}>X</button>
                </section>
              </article>
            ))
          }
          <div className='w-full flex justify-center self-baseline'>
            <button
              className='items-end h-11 w-full max-w-xs bg-orange-500 rounded-sm text-white cursor-pointer'
              onClick={handleCreateProducts}
            >Check</button>
          </div>
        </section>
      </div>
    </main>
  )
}
