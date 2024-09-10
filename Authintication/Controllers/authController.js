const bcrypt = require('bcrypt')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')

//signup

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' })
    }
}

//login

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid Credentials' })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({token});
    } catch (error) {
        res.status(500).json({error: 'Login failed'})
    }
}

module.exports = {
    signup,
    login
}