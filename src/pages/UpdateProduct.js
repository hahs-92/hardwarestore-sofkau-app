import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//actions
import { getProduct, updateProduct,addProductToList } from '../actions/productActions'


export const UpdateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    //agregar producto a la lista
    dispatch(addProductToList({
      ...productInfo,
      quantity: parseInt(productInfo.quantity) - parseInt(product.quantity),
    }))
    //redirigir a crear flyer
    navigate("/flyers/create")

    setProductInfo({ name:"", price:"", quantity:"", limit:""})
  }


  useEffect(() => {
    dispatch(getProduct(id))
  },[id])

  return (
    <main className='flex justify-center items-center my-20 '>
      <section className="flex p-5 w-full max-w-sm bg-orange-100 shadow-lg">
        <form
          className="flex flex-col w-full"
          onSubmit={handleOnSubmit}
        >
            <label  className="text-slate-500" htmlFor="name">Name:</label>
            <input
              className='h-11 my-1 px-1'
              type="text"
              placeholder="Nombre"
              name="name"
              value={productInfo.name}
              onChange={handleOnChange}
              required
            />
            <label  className="text-slate-500" htmlFor="price">Price:</label>
            <input
              className='h-11 my-1 px-1'
              type="number"
              placeholder="Precio"
              name='price'
              value={productInfo.price}
              onChange={handleOnChange}
              required
            />
            <label className="text-slate-500" htmlFor="quanity">Quantity:</label>
            <input
              className='h-11 my-1 px-1'
              type="number"
              placeholder="Cantidad"
              name='quantity'
              value={productInfo.quantity}
              onChange={handleOnChange}
              required
            />
            <label className="text-slate-500" htmlFor="limit">Limit:</label>
            <input
              className='h-11 my-1  px-1'
              type="number"
              placeholder="Limit"
              name='limit'
              value={productInfo.limit}
              onChange={handleOnChange}
              required
            />
            <input
              className='h-11 my-1 px-1 bg-orange-500 text-white rounded-sm cursor-pointer'
              type="submit"
              value="Update"
            />
        </form>
      </section>
    </main>

  )
}

