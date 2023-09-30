const {db} = require("../utils/db");
const {generateAccessToken, generateRefreshToken} = require("../utils/tokens");
const {validationResult} = require("express-validator");
const {compare} = require("bcrypt");

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {studentId, password} = req.body;

    try {
        const user = await db.student.findUnique({
            where: {
                studentId
            }
        });
        if (user == null) {
            res.status(404).json({message: "user not found"})
        }
        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const accessToken = generateAccessToken(user.studentId)
        const refreshToken = generateRefreshToken(user.studentId)
        res.status(200).json({accessToken, refreshToken})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'})
    }

}

module.exports = {login}