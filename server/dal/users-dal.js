let connection = require("./connection-wrapper");

async function addUser(userRegistrationData) {
    let sql = "INSERT INTO users (first_name, last_name, email, password, user_type) VALUES (?, ?, ?, ?, ?)";
    let parameters = [userRegistrationData.firstName, userRegistrationData.lastName, userRegistrationData.email, userRegistrationData.password, userRegistrationData.userType];
    await connection.executeWithParameters(sql, parameters);
}

async function isUserExistsByEmail(userEmail) {
    let sql = "SELECT * FROM users WHERE email=?";
    let parameters = [userEmail];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users.length === 0) {
        return false;
    }
    return true;
}

async function userLogin(userLoginData) {
    let sql = "SELECT id, user_type as userType, first_name as firstName FROM users WHERE `email`=? AND `password`=?";
    let parameters = [userLoginData.email, userLoginData.password];
    let [userData] = await connection.executeWithParameters(sql, parameters);

    if (!userData) {
        return null;
    }

    return userData;
}

module.exports = {
    addUser,
    isUserExistsByEmail,
    userLogin
};