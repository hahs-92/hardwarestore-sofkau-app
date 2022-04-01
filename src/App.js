import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//actions
import { getProducts } from './actions/productActions'
import { getInvoices } from './actions/invoicesActions'
import { getSuppliers } from './actions/supplierActions'


function App() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const invoices = useSelector(state => state.invoices.invoices)
  const suppliers = useSelector(state => state.suppliers.suppliers)

  useEffect(() => {
      dispatch(getSuppliers("uri"))
      dispatch(getProducts("uri"))
      dispatch(getInvoices("uri"))
  },[])


  console.log("products: ", products)
  console.log("suppliers: ", suppliers)
  console.log("invoices: ", invoices)

  return (
    <div className="App">
      hi there!
    </div>
  );
}

export default App;
