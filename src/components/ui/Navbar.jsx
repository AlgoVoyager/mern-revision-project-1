import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"

const Navbar = () => {
    const {user, logout} = useUserContext()
    return (<>
        <header className='flex pl-34 px-10 justify-between py-2 border-b items-center'>
            <h2 className="logo">Primo</h2>
            <nav className="links flex gap-5">
                {user?(
                    <>
                        <div>User: {user.name}</div>
                        <button onClick={logout}>Logout</button>
                    </>)
                    :(<Link to={'/login'} className="btn" >Login</Link>)
                }
            </nav>
        </header>
    </>
    )
}

export default Navbar