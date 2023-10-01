const {validationResult} = require("express-validator");
const {hash} = require("bcrypt");
const {db} = require("../utils/db");
const register = async (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {studentId, email, gender, department, semester, password} = req.body;
    try {
        const hashedPassword = await hash(password, 10);

        const newUser = await db.student.create({
            data: {
                studentId,
                email,
                password: hashedPassword,
                gender,
                department:department.toLowerCase(),
                semester
            },
        });

        res.status(201).json({message: 'User registered successfully', user: newUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {register}