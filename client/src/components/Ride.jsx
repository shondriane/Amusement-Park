const Ride = (props ) => {

    return (
        <div className='box'>
            <div className='ride-card' onClick={()=>{props.onClick(props.user,props.id)}}>
                <div className='ride-image'>
                    <img src={props.image} alt={props.name} className='ride-img' />
                </div>
                <div className='ride-card-name'>
                    <h2 className='ride-name'>{props.name}</h2>
                </div>
            </div>
        </div>
    )

}

export default Ride 