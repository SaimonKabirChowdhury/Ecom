const User = require('../models/user-model');

exports.changeName = async (req, res) => {
    const userId = req.params.id;
    const updatedName = req.params.name;
    try {
        const existingUser = await User.findById(userId);

        if (existingUser) {
            existingUser.name = updatedName;
            await existingUser.save();
            res.status(200).json({ message: "Name Updated" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.changeProfession = async (req, res) => {
    const userId = req.params.id;
    const profession = req.params.profession;
    try {
        const existingUser = await User.findById(userId);

        if (existingUser) {
            existingUser.profession = profession;
            existingUser.professionAdded =true;
            await existingUser.save();
            res.status(200).json({ message: "Profession Updated" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateNid = async(req,res) =>{

    var nidUrl = req.body.frontUrl;
    var backUrl = req.body.backUrl;
    var userId = req.body.id;

    try {
        const existingUser = await User.findById(userId);

        if (existingUser) {
            existingUser.nidUrl.frontUrl = nidUrl;
            existingUser.nidUrl.backUrl =backUrl;
            existingUser.nidVerified = true;
            await existingUser.save();
            res.status(200).json({ message: "Nid Uploaded" });
        } else {
            res.status(404).json({ message: "Nid Not Uploaded" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    } 

}

exports.changeNumber = async(req,res)=>{}

