const express = require("express");
const router = express.Router();

const usersLogic = require("../logic/users-logic");

router.post("/", async (request, response, next) => {
    let userRegistrationData = request.body;

    try {
        userRegistrationData = { ...userRegistrationData, userType: "USER" };
        await usersLogic.addUser(userRegistrationData);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
        return next(e);
    }
});

router.post("/login", async (request, response, next) => {
    let userLoginData = request.body;

    try {
        let successfulLoginResponse = await usersLogic.userLogin(userLoginData);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json(successfulLoginResponse);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
        return next(e);
    }
});

module.exports = router;