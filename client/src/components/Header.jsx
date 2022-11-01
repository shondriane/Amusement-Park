import { Link, useParams } from 'react-router-dom'

const Header = () => {
  const { userId } = useParams()
  console.log(userId)

  return (
    <nav>
      <h1>Amusement Park Review</h1>
      <div>
        {<Link to="/">Home</Link>}
        {<Link to={`/account/${userId}/rides`}>Ride List</Link>}
        {<Link to={`/account/${userId}/addReview`}>AddReview</Link>}
      </div>
    </nav>
  )
}

export default Header
