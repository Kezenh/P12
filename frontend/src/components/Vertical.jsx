import "../styles/vertical.css"
import { Link } from "react-router-dom"
import bike from "../assets/bike.png"
import swim from "../assets/swim.png"
import weight from "../assets/weight.png"
import zen from "../assets/zen.png"

function Vertical() {
    return (
        <div className="vertical">
            <nav className="activities">
                <Link to=""><img src={bike} alt="bike" /></Link>
                <Link to=""><img src={swim} alt="swim" /></Link>
                <Link to=""><img src={weight} alt="weight" /></Link>
                <Link to=""><img src={zen} alt="zen" /></Link>
            </nav>
            <p className="copyright">Copiryght, SportSee 2020</p>
        </div>
    )
}

export default Vertical