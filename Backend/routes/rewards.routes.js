const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewards.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get user rewards
router.get('/rewards', authMiddleware.authUser, rewardController.getUserRewards);

// Redeem free ride
router.post('/redeem-free-ride', authMiddleware.authUser, rewardController.redeemFreeRide);

// Award ride reward
router.post('/award-ride-reward', authMiddleware.authUser, rewardController.awardRideReward);

module.exports = router;
