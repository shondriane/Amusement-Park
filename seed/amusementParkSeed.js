const db = require('../db')
const Ride = require('../models/ride')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

  const rides = [
    {
      name: 'Aloe Vera',
      description:
        'Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world. It is cultivated for agricultural and medicinal uses.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png',
      heightRequirement: '4',
      reviewId: "636025e88310aa9a05431557"
      
    }
  ]

  const user = [
    {
      id: '12345',
      userName: 'test'
    }
  ]

  const review=[{
    
        "date": "2022-10-31",
        "rideId": "636025e88310aa9a05431539",
        "comment": "This is the best ride ever!!!"
    
  }]

  await Ride.insertMany(rides)
  console.log('Created some rides!')
}
const run = async () => {
  await main()
  db.close()
}

run()
