import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
//pages
import { Dashboard } from '../pages/Dashboard'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
//components
import { PrivateRoutes } from '../components/PrivateRoutes'
import { useState } from 'react'



function App() {
  const [isAuth, setIsAuth] = useState(true)


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/signin" element={<Signin isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
    <Route path="/signup" element={<Signup isAuth={isAuth}  setIsAuth={setIsAuth} />}/>
    <Route element={ <PrivateRoutes isAuth={isAuth} />}>
      <Route path="/" element={ <Dashboard />}/>
    </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App
