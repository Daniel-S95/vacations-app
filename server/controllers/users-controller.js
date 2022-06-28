const express = require("express");
const router = express.Router();

const usersLogic = require("../logic/users-logic");

router.post("/", async (request, response, next) => {
    let userRegistrationData = request.body;

    try {
        userRegistrationData = { ...userRegistrationData, userType: "USER" };
        await usersLogic.addUser(userRegistrationData);

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

        response.json(successfulLoginResponse);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
        return next(e);
    }
});

module.exports = router;