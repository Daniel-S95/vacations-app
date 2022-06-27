const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');

const vacationsLogic = require("../logic/vacations-logic");

router.post("/", async (request, response) => {
    try {
        const vacationDetails = request.body;
        const vacationId = await vacationsLogic.addVacation(vacationDetails);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json(vacationId);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/", async (request, response) => {
    try {
        const wholeToken = request.headers["authorization"];
        let userId = null;

        if (wholeToken) {
            const cleanToken = wholeToken.replace("Bearer ", "");
            userId = jwt_decode(cleanToken).userId;
        }

        const vacations = await vacationsLogic.getAllVacations(userId);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json(vacations);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.put("/:vacationId", async (request, response) => {
    try {
        const vacationData = request.body;
        const vacation = await vacationsLogic.updateVacation(vacationData);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json(vacation);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/:vacationId", async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationsLogic.deleteVacation(vacationId);

        // YOU MUST RETURN A VALUE TO THE CLIENT, OR ELSE - IT WILL GET STUCK
        response.json(vacation);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;