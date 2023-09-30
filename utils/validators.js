const isValidGender = value => {
    if (value !== 'male' && value !== 'female') {
        throw new Error('Gender must be either "male" or "female"');
    }
    return true;
};

const emailEndsWithCSTRubEduBt = value => {
    if (!/.cst@rub\.edu\.bt$/.test(value)) {
        throw new Error('Email must end with cst@rub.edu.bt');
    }
    return true;
};

const allowedDepartments = ['information technology', 'electronics and communications engineering', 'electrical engineering', 'engineering geology', 'architecture', 'instrumentation and control engineering', 'software engineering', 'water resource engineering', 'mechanical engineering', 'civil engineering',];

const isValidDepartment = value => {
    if (!allowedDepartments.includes(value.toLowerCase())) {
        throw new Error('Invalid department');
    }
    return true;
};

const allowedSemesters = ["I","II","III","IV","V","VI","VII","VIII"]
const isValidSemester = value => {
    if (!allowedSemesters.includes(value.toUpperCase())) {
        throw new Error('Invalid semester');
    }
    return true;
};

module.exports = {
    isValidDepartment,
    isValidSemester,
    isValidGender,
    emailEndsWithCSTRubEduBt
}