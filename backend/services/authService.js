const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashedPassword = async (password) => {
    const salt = await bcyrpt.genSalt(10);
    const hashed = await bcyrpt.hash(password, salt);
    return hashed;
};

const createToken = async (user) => {
    return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

const comparePassword = async (password, dbPassword) => {
    return await bcyrpt.compare(password, dbPassword);
};

module.exports = {
    hashedPassword,
    createToken,
    comparePassword
};