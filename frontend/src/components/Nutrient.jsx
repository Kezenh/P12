import "../styles/nutrient.css"

function Nutrient({ src, name, quantity }) {
    return (
        <div className="nutrient">
            <img className="nutrientImg" src={src} alt={src} />
            <div>
                <p className="nutrientQuantity">{quantity}</p>
                <p className="nutrientName">{name}</p>
            </div>
        </div>
    )
}

export default Nutrient