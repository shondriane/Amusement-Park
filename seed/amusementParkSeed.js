const db = require("../db");
const Ride = require("../models/ride");
const User = require("../models/user");
const Review = require("../models/review");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  const rides = [
    {
      name: "Roller Coaster",
      description: "This is about the roller coaster.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png",
      location: "theme park",
      heightRequirement: "4",
      reviewId: "636025e88310aa9a05431557"
    }
  ];

  const review = [
    {
      date: "2022-10-31",
      rideId: "636025e88310aa9a05431539",
      comment: "This is the best ride ever!!!"
    }
  ];

  await Ride.insertMany(rides);
  await Review.insertMany(review);
  console.log("Created some rides!");
};
const run = async () => {
  await main();
  db.close();
};

run();
