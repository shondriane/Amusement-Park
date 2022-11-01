const ReviewCard = ({ userName,comment }) => {
  
    return (
      <div className="card" onClick={onClick}>
    <h3> {date} </h3>
      <h3> {userName}</h3>
      <h3> {comment}</h3>
    
         
      </div>
    )
  }
  
  export default ReviewCard