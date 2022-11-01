import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RideDetails = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()

    const [ rideDetails, setRideDetails ] = useState()

    const getRideDetails = async () => {
        const rides = await axios.get('http://localhost:3001/api/allrides')
        setRideDetails(rides.data.ride)
    }

    useEffect(() => {
        getRideDetails()
    }, [id])

    return (
        <div>
            Hello

        </div>
    )

}
export default RideDetails 