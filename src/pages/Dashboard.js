import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//actions
import { getProducts } from '../actions/productActions'

export const Dashboard = () => {
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  },[])

  console.log("products: ", products)

  return (
    <main>
      <section>
        <h2>Don Raul</h2>
      </section>

      <section>

      </section>

      <section>
        {/* listado de los productos seleccionados */}
      </section>
    </main>
  )
}
