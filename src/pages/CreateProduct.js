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
        price: parseInt(productInfo.price),
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
    <main>
      <section>
        <form onSubmit={handleOnSubmit} >
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
              type="text"
              placeholder="Nombre"
              name="name"
              value={productInfo.name}
              onChange={handleOnChange}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              name='price'
              value={productInfo.price}
              onChange={handleOnChange}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              name='quantity'
              value={productInfo.quantity}
              onChange={handleOnChange}
              required
            />
            <input
              type="number"
              placeholder="Limit"
              name='limit'
              value={productInfo.limit}
              onChange={handleOnChange}
              required
            />
            <input type="submit" value="Add Product" />
        </form>
      </section>

      <section>
        {
          listProductsToCreate.length && listProductsToCreate.map(p => (
            <article key={p.name}>
              <section>
                <span>{p.name}</span>
                <span>{p.price}</span>
                <span>{p.quantity}</span>
              </section>
              <section>
                <button onClick={() => dispatch(removeProductToList(p.name))}>Remove</button>
              </section>
            </article>
          ))
        }
        <div>
          <button onClick={handleCreateProducts}>Add products</button>
        </div>
      </section>
    </main>
  )
}
