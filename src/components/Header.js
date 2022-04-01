import { NavLink } from 'react-router-dom'
//helpers
import { logout } from '../helpers/auth'


export const Header = () => {

    const handleOnClick = async() => {
        try {
            logout()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <section >
            <header >
                <h1>DonRaul</h1>
            </header>

            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={ ({isActive}) => isActive ? "red" : "" }
                        >Home</NavLink>
                    </li>
                    <li onClick={ handleOnClick}>
                        logout
                    </li>
                </ul>
            </nav>
        </section>
    )
}
