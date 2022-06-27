const usersDal = require('../dal/users-dal');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

async function addUser(userRegistrationData) {
    validateUserData(userRegistrationData);

    if (await usersDal.isUserExistsByEmail(userRegistrationData.email)) {
        throw new Error("Email alreay exists!");
    }

    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    await usersDal.addUser(userRegistrationData);
}

function validateUserData(userData) {
    if (!userData.email) {
        throw new Error("Invalid email");
    }

    if (!userData.password) {
        throw new Error("Invalid password");
    }

    if (userData.password.length < 4) {
        throw new Error("Password is too short");
    }
}

async function userLogin(userLoginData) {
    validateUserData(userLoginData);

    userLoginData.password = encryptPassword(userLoginData.password);

    if (!await usersDal.isUserExistsByEmail(userLoginData.email)) {
        throw new Error("This email is not registered!");
    }

    let userData = await usersDal.userLogin(userLoginData);

    if (!userData) {
        throw new Error("The password you entered is incorrect!");
    }

    const token = jwt.sign({ userId: userData.id, userType: userData.userType }, config.secret);
    let successfulLoginResponse = { token, firstName: userData.firstName };
    return successfulLoginResponse;
}

function encryptPassword(password) {
    const saltRight = "cqEd4jK!iw5E*3bsrLnTHf9P%";
    const saltLeft = "bxVSZ!&4$hm!zhT7A73WkBZAY";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

module.exports = {
    addUser,
    userLogin
};