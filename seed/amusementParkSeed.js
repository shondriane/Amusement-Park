const db= require('../db')
const Ride = require('../models/ride')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const rides = [
        { name: 'Aloe Vera', description: 'Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world. It is cultivated for agricultural and medicinal uses.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png', heightRequirement: '4',},
     
    ]

    const user=[{
       id:"12345", userName: "test"
    }]

    await Ride.insertMany(rides)
    console.log("Created some rides!")
}
const run = async () => {
    await main()
    db.close()
}

run()
