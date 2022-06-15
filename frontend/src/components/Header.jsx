import { Link } from "react-router-dom"
import "../styles/header.css"
import logo from "../assets/logo.png"

function Header() {
    return (
        <header>
            <img className="logo" src={logo} alt="" />
            <nav>
                <Link className="link" to="">Accueil</Link>
                <Link className="link" to="">Profil</Link>
                <Link className="link" to="">Réglage</Link>
                <Link className="link" to="">Communauté</Link>
            </nav>
        </header>
    )
}

export default Header