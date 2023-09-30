const express = require('express');
const {body, validationResult} = require('express-validator');

const router = express.Router();
const {v4: uuidV4} = require('uuid');

const {login} = require("../controllers/login");
const {emailEndsWithCSTRubEduBt, isValidGender, isValidDepartment, isValidSemester} = require("../utils/validators");

const {hash} = require("bcrypt");
const {db} = require("../utils/db");
const {register} = require("../controllers/register");

router.post("/login",
    [
        body('studentId').isNumeric().isLength({min: 8, max: 8}),
        body('password').isLength({min: 5}),
    ], login)

router.post(
    "/register",
    [
        body('studentId').isNumeric().isLength({min: 8, max: 8}),
        body('email').isEmail().custom(emailEndsWithCSTRubEduBt),
        body('gender').custom(isValidGender),
        body('department').custom(isValidDepartment),
        body('semester').custom(isValidSemester),
        body('password').isLength({min: 8})
    ], register)

module.exports = router;
