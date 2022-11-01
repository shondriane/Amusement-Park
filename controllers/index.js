const Review = require("../models/review");
const User = require("../models/user");
const Ride = require("../models/ride");

//review Controllers
const createReview = async (req, res) => {
  try {
    const review = await new Review(req.body);
    await review.save();
    return res.status(201).json({
      review
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const review = await Review.find();
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllReviewsByRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const review = await Review.find({ rideId: rideId });
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllReviewsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.find({ userId: id });
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(review);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Review deleted");
    }
    throw new Error("Review not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


//Ride Controllers
const getAllRides = async (req, res) => {
  try {
    const ride = await Ride.find();
    return res.status(200).json({ ride });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(ride);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteRide = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ride.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Ride deleted");
    }
    throw new Error("Ride not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const createRide = async (req, res) => {
  try {
    const ride = await new Ride(req.body);
    await ride.save();
    return res.status(201).json({
      ride
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//User Controllers

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const userData = await User.findById(req.params.userId);
    return res.status(200).json({ userData });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const createNewUser = await User.create(req.body);
    res.send(createNewUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getAllReviewsByRide,
  getAllReviewsByUserId,
  updateReview,
  deleteReview,
  updateRide,
  deleteRide,
  createRide,
  getAllRides,
  deleteUser,
  createUser,
  updateUser,
  getUserById
};
