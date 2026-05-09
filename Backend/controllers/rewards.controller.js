const userModel = require('../models/user.model');
const rewardService = require('../services/rewards.service');

module.exports.getUserRewards = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const rewardData = await rewardService.getUserRewards(userId);
        res.status(200).json(rewardData);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.redeemFreeRide = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await rewardService.redeemFreeRide(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports.awardRideReward = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { rideId } = req.body;

        if (!rideId) {
            return res.status(400).json({
                success: false,
                message: 'Ride ID is required',
            });
        }

        const result = await rewardService.awardRideReward(rideId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
