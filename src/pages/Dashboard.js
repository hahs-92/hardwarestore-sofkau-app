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



  return (
    <main>
      <section>
        <h2>Don Raul</h2>
      </section>

      <section>
        {/* listado productos */}
      </section>

      <section>
        {/* listado de los productos seleccionados */}
      </section>
    </main>
  )
}
