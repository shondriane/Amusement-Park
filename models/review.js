const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Review = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, REF: 'User'},
        date: { type: String,  required:  false},
        rideId: {type: Schema.Types.ObjectId, ref:'Ride'},
       comment: { type: String, required: true },
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Review', Review)