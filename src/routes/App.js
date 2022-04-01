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
//components
import { PrivateRoutes } from '../components/PrivateRoutes'
import { Header } from '../components/Header'



function App() {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
  },[isAuth])

  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/signin" element={<Signin isAuth={isAuth} />}/>
    <Route path="/signup" element={<Signup isAuth={isAuth} />}/>
    <Route element={ <PrivateRoutes isAuth={isAuth} />}>
      <Route path="/" element={ <Dashboard />}/>
    </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App
