import { useNavigate } from "react-router-dom";

const ReviewCard = (props) => {
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
        <h3>{props.data.userName}</h3>
        <p>{props.data.date}: {props.data.comment}</p>
        {manageReview}
    </div>
</div>
</div>
    )
  }
  
  export default ReviewCard