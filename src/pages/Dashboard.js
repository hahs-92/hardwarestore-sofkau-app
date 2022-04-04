import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//actions
import { getProducts, updateProducts, removeProductToSelectList } from '../actions/productActions'
//components
import { ProductItem } from '../components/ProductItem'

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

  console.log("data: ", listProductsToSell)

  return (
    <main>
      <section>
        <h2>Don Raul</h2>
      </section>

      <section>
        {
          products.length && !loading
            ? products.map(p => (
              <ProductItem key={p.id} product={p} />
            ))
            : <h2>No tienes Productos</h2>
        }
      </section>

      <section>
        {
          listProductsToSell.length && listProductsToSell.map(p => (
            <article key={p.id}>
              <section>
                <h4>{p.name}</h4>
                <h4>{p.price}</h4>
                <h4>{p.quantityToSell}</h4>
              </section>
              <section>
                <button onClick={() => dispatch(removeProductToSelectList(p.name))}>
                  X
                </button>
              </section>
            </article>
          ))
        }
        <div>
          <button onClick={handleToSell}>Sell</button>
        </div>
      </section>
    </main>
  )
}
