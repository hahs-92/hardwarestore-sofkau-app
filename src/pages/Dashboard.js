import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//icons
import { XCircleIcon } from '@heroicons/react/solid'
//actions
import { getProducts, updateProducts, removeProductToSelectList } from '../actions/productActions'
//components
import { ProductItem } from '../components/ProductItem'
import { Loader } from '../components/Loader'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.products.products)
  const listProductsToSell = useSelector(state => state.products.listProductsToSell)
  const loading = useSelector(state => state.products.loading)

  const handleToSell = () => {
    const productsToSell = listProductsToSell.map(p => {
      p.quantity = p.quantity - p.quantityToSell
      return p
    })
    dispatch(updateProducts(productsToSell))
    navigate("/invoices/create")
  }

  useEffect(() => {
    dispatch(getProducts())
  },[])


  return (
    <main className='h-full flex flex-col items-center justify-center'>
      {
        loading && <Loader />
      }
      {
        !loading
          &&
            <div className='w-full min-h-full max-w-4xl flex flex-wrap my-16 bg-orange-50 shadow-xl'>
              <section
                className='p-6 h-96 w-3/5 overflow-auto'
              >
                <section className="w-full grid grid-cols-5 text-slate-500">
                  <span>Name</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Actions</span>
                </section>
                {
                  products.length
                    ? products.map(p => (
                      <ProductItem key={p.id} product={p} />
                    ))
                    : <h2>No tienes Productos</h2>
                }
              </section>
              <section className='w-2/5 h-96 p-6 flex flex-col justify-between bg-white overflow-auto'>
                {
                  listProductsToSell.length
                    ? listProductsToSell.map(p => (
                      <article
                        className='my-2 flex flex-col h-12 bg-orange-50 justify-center items-stretch rounded-sm shadow-md'
                        key={p.id}
                      >
                        <section className='px-3 grid grid-cols-4 '>
                          <h4>{p.name}</h4>
                          <h4>{p.price}</h4>
                          <h4>{p.quantityToSell}</h4>
                          <section className='flex justify-center'>
                            <button onClick={() => dispatch(removeProductToSelectList(p.name))}>
                              <XCircleIcon className='w-7' />
                            </button>
                        </section>
                        </section>
                      </article>
                      ))
                    : <h2>Add a product</h2>
                }
                <div className='flex justify-center'>
                  <button
                    className='w-4/5 h-11 bg-orange-500 text-white rounded-sm cursor-pointer'
                    onClick={handleToSell}
                  >Sell</button>
                </div>
              </section>
            </div>

      }
    </main>
  )
}
