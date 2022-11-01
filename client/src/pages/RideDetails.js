import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RideDetails = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()

    const [ rideDetails, setRideDetails ] = useState()

    const getRideDetails = async () => {
        const ride = await axios.get('http://localhost:3001/api/allrides')
        setRideDetails(ride.data.ride)
    }

    useEffect(() => {
        getRideDetails()
    }, [id])

    return (
        <div className="deets">
            {rideDetails ? (
            <div className="ride-details">
                <div>
                    <h1 id="ride-name">{rideDetails.name}</h1>
                </div>
                <section className='image-box'>
                    <img src={rideDetails.image} alt={rideDetails.name} />
                </section>
                <section className='location'>
                    <h3>Location: </h3>
                    <p>{rideDetails.location}</p>
                </section>
                <section className='height'>
                    <h3>Height Requirement: </h3>
                    <p>{rideDetails.heightRequirement}</p>
                </section>
                <div>
                    <h3>{rideDetails.description}</h3>
                </div>
            </div>
            ) : <h1>Not Found.</h1>}  
       
        </div>
    )

}
export default RideDetails 

// “name”:
// “image”:
// “location”:
// “heightRequirement”:
// “description”: