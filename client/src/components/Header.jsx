import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav>
            <h1>Amusement Park Review</h1>
            <div>
                {<Link to="/">Home</Link>}
            </div>
        </nav>
    )
}

export default Header