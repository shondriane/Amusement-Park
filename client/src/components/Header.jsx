import { Link} from 'react-router-dom'

const Header = (props) => {

  return (
    <nav>
      <h1>Amusement Park Review</h1>
      <div>
        {<Link to="/">Home</Link>}
        {<Link to={`/account/${props.userObjectId}/rides`}>Ride List</Link>}
        {<Link to={`/account/${props.userObjectId}/addReview`}>AddReview</Link>}
      </div>
    </nav>
  )
}

export default Header
