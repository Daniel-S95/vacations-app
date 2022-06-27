const likedVacationsDal = require('../dal/liked-vacations-dal');
const pushLogic = require('./push-logic');

async function likeVacation(likeDetails) {
    await likedVacationsDal.likeVacation(likeDetails);
    pushLogic.broadcast("like-vacation", likeDetails.vacationId);
}

async function dislikeVacation(dislikeDetails) {
    await likedVacationsDal.dislikeVacation(dislikeDetails);
    pushLogic.broadcast("dislike-vacation", +dislikeDetails.vacationId);
}

async function getDataForChart() {
    return await likedVacationsDal.getDataForChart();
}

module.exports = {
    likeVacation,
    dislikeVacation,
    getDataForChart
};