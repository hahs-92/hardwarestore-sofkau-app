import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//actions
import { getProduct, updateProduct} from '../actions/productActions'


export const UpdateProduct = () => {
  const dispatch = useDispatch()
  const product = useSelector(state => state.products.product)
  const [ productInfo, setProductInfo] = useState(product)
  const {id} = useParams()

  const handleOnChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct(productInfo))
    setProductInfo({ name:"", price:"", quantity:"", limit:""})
  }

  console.log("id: ", id)
  console.log("update: ", productInfo)

  useEffect(() => {
    if(id) getProduct(id)
  },[id])

  return (
    <main>
      <section>
      <form onSubmit={handleOnSubmit} >
            {/* mostrar el supplier */}
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
    </main>

  )
}

