const userModel = require('../models/user.model');
const rideModel = require('../models/ride.model');

module.exports.addRewardPoints = async (userId, points = 1) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.rewards += points;
        user.totalRewardsEarned += points;

        await user.save();

        return {
            success: true,
            rewards: user.rewards,
            totalRewardsEarned: user.totalRewardsEarned,
            message: `${points} reward points added successfully!`,
        };
    } catch (error) {
        throw error;
    }
};

module.exports.redeemFreeRide = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const REWARD_THRESHOLD = 200;

        if (user.rewards < REWARD_THRESHOLD) {
            throw new Error(
                `Insufficient rewards. You need ${REWARD_THRESHOLD} rewards for a free ride. Current: ${user.rewards}`
            );
        }

        user.rewards -= REWARD_THRESHOLD;
        user.freeRidesUsed += 1;

        await user.save();

        return {
            success: true,
            rewards: user.rewards,
            freeRidesUsed: user.freeRidesUsed,
            message: 'Free ride redeemed successfully!',
        };
    } catch (error) {
        throw error;
    }
};

module.exports.getUserRewards = async (userId) => {
    try {
        const user = await userModel.findById(userId).select('rewards totalRewardsEarned freeRidesUsed');
        if (!user) {
            throw new Error('User not found');
        }

        const remainingForFreeRide = 200 - user.rewards;

        return {
            success: true,
            rewards: user.rewards,
            totalRewardsEarned: user.totalRewardsEarned,
            freeRidesUsed: user.freeRidesUsed,
            remainingForFreeRide: Math.max(0, remainingForFreeRide),
            canRedeemFreeRide: user.rewards >= 200,
        };
    } catch (error) {
        throw error;
    }
};

module.exports.awardRideReward = async (rideId, userId) => {
    try {
        const ride = await rideModel.findById(rideId);
        if (!ride) {
            throw new Error('Ride not found');
        }

        // Check if reward was already awarded
        if (ride.rewardPointsEarned) {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Add reward points if ride was completed
            if (ride.status === 'completed') {
                await module.exports.addRewardPoints(userId, ride.rewardPointsEarned);
                return {
                    success: true,
                    message: `Ride completed! You earned ${ride.rewardPointsEarned} reward point(s)`,
                };
            }
        }

        throw new Error('Ride not completed or reward already awarded');
    } catch (error) {
        throw error;
    }
};
