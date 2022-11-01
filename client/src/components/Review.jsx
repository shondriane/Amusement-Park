const ReviewCard = ({ userName,comment }) => {
  
    return (
<div className='box'>
<div className='review-card'>
   
    <div className='review-card-details'>
        <h3>{userName}</h3>
        <p>{date}: {comment}</p>
    </div>
</div>
</div>
    )
  }
  
  export default ReviewCard