import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
//actions
import { addProductToList, removeProductToList, createProducts, cleanProductToList } from '../actions/productActions'

export const CreateProduct = () => {
  const dispatch = useDispatch()
  const [ productInfo, setProductInfo] = useState({ name:"", price:"", quantity:"", limit:""})
  const [ supplierSelect, setSupplierSelect] = useState(null)
  const listProductsToCreate = useSelector(state => state.products.listProductsToCreate)

  //reemplazarlas por los supliers
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const handleOnChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateProducts = () => {
    dispatch(createProducts(listProductsToCreate))
    dispatch(cleanProductToList())
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(addProductToList(
      {
        ...productInfo,
        price: parseInt(productInfo.price),
        quantity: parseInt(productInfo.quantity),
        limit: parseInt(productInfo.limit),
        supplier: supplierSelect
      }
    ))
    setProductInfo({ name:"", price:"", quantity:"", limit:""})
  }

  console.log("prod: ", listProductsToCreate)

  return (
    <main>
      <section>
        <form onSubmit={handleOnSubmit} >
            {/* validar si hay supplier */}
            <Select
                defaultValue={supplierSelect}
                onChange={setSupplierSelect}
                options={ options}
                required
            />
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
                <span>{p.supplier.value}</span>
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
