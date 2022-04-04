import { NavLink } from 'react-router-dom'
//helpers
import { logout } from '../helpers/auth'
//assets
import logo from '../assets/logo.jpg'


export const Header = () => {

    const handleOnClick = async() => {
        try {
            logout()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <section className='flex justify-between items-center p-4 h-28 bg-orange-500 shadow-lg' >
            <header>
               <div>
                <img
                    className='w-20'
                    src={logo}
                    alt="logo"
                />
               </div>
            </header>

            <nav className='w-5/12'>
                <ul className='flex justify-around text-xl'>
                    <li>
                        <NavLink
                            to="/"
                            className= {({isActive}) => isActive ? "text-green-50" : "text-black"}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/suppliers"
                            className= {({isActive}) => isActive ? "text-green-50" : "text-black"}
                        >Suppliers</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className= {({isActive}) => isActive ? "text-green-50" : "text-black"}
                        >Products</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sales"
                            className= {({isActive}) => isActive ? "text-green-50" : "text-black"}
                        >Sales</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/flyers"
                            className= {({isActive}) => isActive ? "text-green-50" : "text-black"}
                        >Flyers</NavLink>
                    </li>
                    <li onClick={ handleOnClick}>
                        logout
                    </li>
                </ul>
            </nav>
        </section>
    )
}
