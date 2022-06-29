import "../styles/nutrient.css"

/**
 * Create a Nutrient element
 * @param { String } src
 * @param { String } name
 * @param { String } quantity
 * @return { HTMLElement } 
 */
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