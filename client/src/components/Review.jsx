import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ReviewCard = (props) => {
    const [reviewUser, updateReviewUser] = useState("")
    const [needReviewUser, setNeedReviewUser] = useState(true)
    let navigate = useNavigate();
    const review = props.data
    console.log(review)
    console.log(props.currentUserId)

    const editSelectedReview = () => {
        navigate(`/updateReview/${review._id}/${props.currentUserId}`)
    }
    const removeSelectedReview = () => {
        props.handleRemove(review._id)
    }

    const getReviewUser = async (id) => {
        const userObject = await axios
          .get(`/api/user/${review.userId}`)
          .then((response) => {
            updateReviewUser(response.data.userData);
    
            return response;
          })
          .catch((error) => {
            console.error(error);
          });
      };


      if(needReviewUser){
        getReviewUser();
        setNeedReviewUser(false)
      }
    
    let manageReview = <div>
    </div>

    if(review.userId === props.currentUserId){
        manageReview = 
        (<div>
            <button onClick={editSelectedReview}> Edit </button>
            <button onClick={removeSelectedReview}> Remove</button>
        </div>)
    }

    return (
<div className='box'>
<div className='review-card'>
   
    <div className='review-card-details'>
        <h3>{reviewUser.userName}</h3>
        <p>{props.data.date}: {props.data.comment}</p>
        {manageReview}
    </div>
</div>
</div>
    )
  }
  
  export default ReviewCard