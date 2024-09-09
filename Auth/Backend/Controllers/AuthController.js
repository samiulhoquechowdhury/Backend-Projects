const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel
        if (user) {
            return res.status(409)
                .json({ message: "User already exist, login", success: false })
        }
        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        
    } catch (error) {

    }
}

module.exports = {
    signup
}