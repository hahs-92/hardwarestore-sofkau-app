import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { onAuthStateChanged} from 'firebase/auth'
//services
import { auth } from '../services/firebase'
//pages
import { Dashboard } from '../pages/Dashboard'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
import { Suppliers } from '../pages/Suppliers'
import { Products } from '../pages/Products'
import { CreateSupplier } from '../pages/CreateSupplier'
import { UpdateSupplier } from '../pages/UpdateSupplier'
import { CreateProduct } from '../pages/CreateProduct'
import { UpdateProduct } from '../pages/UpdateProduct'
import { Sales } from '../pages/Sales'
import { CreateInvoice } from '../pages/CreateInvoice'
//components
import { PrivateRoutes } from '../components/PrivateRoutes'
import { Header } from '../components/Header'


function App() {
  const [isAuth, setIsAuth] = useState(true) //cambiar a false

  // useEffect(() => {
  //   onAuthStateChanged(auth,(user) => {
  //     if (user) {
  //       setIsAuth(true)
  //     } else {
  //       setIsAuth(false)
  //     }
  //   })
  // },[isAuth])

  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="signin" element={<Signin isAuth={isAuth} />}/>
    <Route path="signup" element={<Signup isAuth={isAuth} />}/>
    <Route element={ <PrivateRoutes isAuth={isAuth} />}>
      <Route path="/" element={ <Dashboard />}/>

      <Route path="suppliers" element={ <Suppliers /> } />
      <Route path="suppliers/create" element={ <CreateSupplier />}/>
      <Route path="suppliers/update/:id" element={ <UpdateSupplier />}/>

      <Route path="products" element={ <Products /> } />
      <Route path="products/create" element={ <CreateProduct />}/>
      <Route path="products/update/:id" element={ <UpdateProduct />}/>

      <Route path="invoices/create" element={ <CreateInvoice />} />

      <Route path="sales" element={ <Sales /> } />

      <Route path="*" element={ <h1>Not Found</h1> } />

    </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App
