import { Link, Outlet } from "react-router-dom"
import { BiSearchAlt2 } from 'react-icons/bi'
import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import '../styles/Home.css'
import { Helmet } from "react-helmet"

export default function Home() {
    const { id } = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container-home">
            <Helmet>
                <title>Levi - Clone - Strawberries</title>
            </Helmet>
            <nav className="nav-bar">
                <ul className="ul-home">
                    <li className="li-home">
                        <Link to={'/home/search'}>
                            <BiSearchAlt2 />
                        </Link>
                    </li>
                    <li className="li-home">
                        <Link to={'/'}>
                            <AiOutlineHome />
                        </Link>
                    </li>
                    <li className="li-home">
                        <Link to={`/home/profile/${id}`}>
                            <CgProfile />
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}