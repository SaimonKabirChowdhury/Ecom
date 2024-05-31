const User = require('../models/user-model');


exports.checkUser = async (req, res) => {
    const user = req.params.number;

    try {
        const available = await User.find({ unique_phone_number: user });

        if (available.length > 0) {
            res.status(200).json({ message: "Otp Sent to the mobile Number" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while checking the user" });
    }
};

exports.verifyOtp = async(req,res)=>{
    const otp = req.params.number;
    console.log(otp);
 try{

    if(otp =="0000"){
        res.status(200).json({ message: "Otp Verified" });
        
    }   else {
        res.status(404).json({ message: "Incorrect Otp" });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while checking the user" });
}



}

exports.changePassword = async (req, res) => {
    const user = req.params.number;
    const password = req.params.password;

    try {
        const existingUser = await User.findOne({ unique_phone_number: user });

        if (existingUser) {
            const updatedUser = await User.findOneAndUpdate(
                { unique_phone_number: user },
                { $set: { password: password } },
                { new: true } // This ensures that the updated document is returned
            );

            if (updatedUser) {
                res.status(200).json({ message: "Password Updated" });
            } else {
                res.status(500).json({ message: "Error Updating Password" });
            }
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
