import { Link} from 'react-router-dom'

const Header = (props) => {

  return (
    <header>
      <nav>
        <div id="nav-logo">
          <h1>Adrenaline Junkies</h1>
        </div>
        <div></div>
        <div className="nav-links">
          {<Link to="/">Home</Link>}
          {<Link to={`/account/${props.userObjectId}/rides`}>Ride List</Link>}
          {<Link to={`/account/${props.userObjectId}/addReview`}>AddReview</Link>}
        </div>
      </nav>
    </header>
  )
}

export default Header
