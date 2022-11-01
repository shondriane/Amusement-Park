const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/", (req, res) => res.send("This is root!"));

//Routers for Reviews
router.post("/review", controllers.createReview);
router.get("/review", controllers.getAllReviews);
router.get("/user/:id/rides/review/:rideId", controllers.getAllReviewsByRide);
router.get("/review/:id", controllers.updateReview);
router.put("/review/:id", controllers.updateReview);
router.delete("/review:id", controllers.deleteReview);

//Routers for Rides
router.get("/allrides", controllers.getAllRides);
router.post("/ride", controllers.createRide);
router.put("/rides/:id", controllers.updateRide);
router.delete("/rides/:id", controllers.deleteRide);


//Routers for User
router.put("/user/:userId", controllers.updateUser);
router.delete("/user:userId", controllers.deleteUser);
router.post("/user", controllers.createUser);
router.get("/user/:userId", controllers.getUserById);
router.get("/user/review/:userId", controllers.getAllReviewsByUserId);

module.exports = router;
