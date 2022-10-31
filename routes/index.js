const { Router } = require('express');
const controllers=require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))

router.post('/review', controllers.createReview)
router.get('/review',controllers.getAllReviews)
router.get('/ride/review/:rideId', controllers.getAllReviewsByRide)
router.get('/user/review/:userId',controllers.getAllReviewsByUserId)
router.put('/review/:id', controllers.updateReview)
router.delete('/review:id',controllers.deleteReview)
router.put('/ride/:rideId',controllers.updateRide)
router.delete('/ride:rideId',controllers.deleteRide)
router.post('/ride', controllers.createRide)
router.get('/rides', controllers.getAllRides)
router.put('/user/:userId',controllers.updateUser)
router.delete('/user:userId',controllers.deleteUser)
router.post('/user', controllers.createUser)
router.get('/user', controllers.getUserById)



module.exports = router;


