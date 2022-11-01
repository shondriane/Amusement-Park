import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Review = (props) => {
    const navigate = useNavigate()
    let { rideId,reviewId } = useParams()
    const { userId } = useParams();
  
    const [review, setReview] = useState([])
    const [currentUser, updateCurrentUser] = useState("");
  
  
  
    const getReviews = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/user/${userId}/rides/review/${rideId}`
      );
      console.log("is this working", response);
      console.log(response.data.review)
      setReview(response.data.review);
    };
  
    const getCurrentUser = async (id) => {
      console.log(userId)
        const userObject = await axios
          .get(`http://localhost:3001/api/user/${userId}`)
          .then((response) => {
            console.log(response)
            updateCurrentUser(response.data.userData);
            return response;
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      useEffect(() => {
        if (userId.length === 24) {
          getCurrentUser(userId);
          console.log("grrr")
          getReviews()
       
        }
      }, [rideId]);
  
  
  const removeReview=async()=>{
    if(window.confirm('Are you sure you wish to delete this item?')){
      const remove = await axios.delete(`http://localhost:3001/api/user/${userId}/rides/review/${review[0]._id}`)
      navigate(-1)
    }
    }
   
  
  
  
  
    return  (
      <div className="ride-content">
        
        <Link onClick={() => navigate(-1)}>Go back to RideList</Link>
      
        <section className="details">
         
        <h2>userName: {currentUser.name}</h2>
        
          <h2> Date: {review.date}</h2>
        
        
            <p> {review.comment}</p>
           
           
  
            <button className="remove"onClick={removeReview} >Remove</button>
         
        
        
        </section>
      </div>
    ) 
  }
  
  export default Review