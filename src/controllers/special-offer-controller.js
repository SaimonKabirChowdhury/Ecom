const mongoose = require('mongoose');
const User = require('../models/user-model');
const SpecialOffer = require('../models/special-model');
const OneSignal = require('onesignal-node');
const Notification = require('../models/notification-model');
const client = new OneSignal.Client('19b68508-eadf-48fa-bab6-2650fbc03a6b', 'MDFmYThhYjMtNzVlNi00YzI0LTlhMjAtZDZjMjc2MmZjYzg4');

exports.giverOffer = async (req, res) => {
    try {
        const offer = new SpecialOffer({
            offertype: req.body.offerType,
            offerUrl: req.body.offerUrl,
            offerText: req.body.offerText,
            offerAssignedTo: req.body.offerAssignedTo,
            offeredDiscount: req.body.offeredDiscount,
            givenAt: Date.now()
        });

        const user = await User.findById(req.body.offerAssignedTo);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const createOffer = await offer.save();
        user.specialOffer.addToSet(createOffer._id);
        await user.save();
        const notification = {
            contents: {
                en: "Congratulations team halal has offered you " + req.body.offeredDiscount + " percent discount"
            },
            include_player_ids: [user.playerId],
            data: { page: "Notification" }
        };

        const notified = new Notification({
            notificationHeading: "Offer given by team halal",
            notificationDescription: notification.contents.en,
            notificationType: "Offer",
            notificationDate: Date.now(),
            notificationSentTo: req.body.offerAssignedTo
        });

        try {
            const response = await client.createNotification(notification);
            console.log('Notification Response:', response); // Log the response for debugging

            if (response.errors) {
                console.error('OneSignal API Error:', response.errors); // Log any errors from OneSignal
                return res.status(500).json({ message: "Notification Error: " + response.errors });
            }

            const result = await notified.save();
            if (!result) {
                return res.status(500).json({ message: "Failed to save notification" });
            }

            return res.status(200).json({ message: "Offer given to the user and notification sent" });

        } catch (notificationError) {
            console.error('Failed to send notification:', notificationError); // Log any exceptions during the notification process
            return res.status(500).json({ message: "Failed to send notification: " + notificationError.message });
        }

    } catch (error) {
        console.error('Error Happened:', error); // Log any exceptions during the entire process
        return res.status(500).json({ message: "Error Happened: " + error.message });
    }
};

exports.getOfferforUser = async (req, res) => {
    try {
        const offerUser = await SpecialOffer.find({ offerAssignedTo: req.params.userid });
        if (!offerUser || offerUser.length === 0) {
            return res.status(404).json({ message: "No offer found" });
        }

        return res.status(200).json({ offerUser });

    } catch (error) {
        console.error('Error Happened:', error);
        return res.status(500).json({ message: "Error Happened: " + error.message });
    }
};
