const jwt = require("jsonwebtoken");
const {v4: uuidV4} = require("uuid");

const jwtSecretKey = 'very-secure-key';
function generateAccessToken(studentId) {
    return jwt.sign({studentId}, jwtSecretKey, {expiresIn: '30m'})
}

function generateRefreshToken(studentId) {
    const refreshToken = uuidV4();
    // todo: start make the mechanism to store refresh tokens in db

    // your code here


    return refreshToken;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}