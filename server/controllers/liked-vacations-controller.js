const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');

const likedVacationLogic = require("../logic/liked-vacations-logic");

const decryptUserId = (token) => {
    const cleanToken = token.replace("Bearer ", "");
    userId = jwt_decode(cleanToken).userId;
    return userId;
}

router.post("/", async (request, response) => {
    try {
        let likeDetails = request.body;
        let userId = decryptUserId(likeDetails.userToken);
        
        likeDetails = { ...likeDetails, userId };
        await likedVacationLogic.likeVacation(likeDetails);

        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.delete("/:userToken/:vacationId", async (request, response) => {
    try {
        let dislikeDetails = request.params;
        let userId = decryptUserId(dislikeDetails.userToken);

        dislikeDetails = { ...dislikeDetails, userId };
        await likedVacationLogic.dislikeVacation(dislikeDetails);

        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.get("/", async (request, response) => {
    try {
        const vacationsData = await likedVacationLogic.getDataForChart();

        response.json(vacationsData);
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

module.exports = router;