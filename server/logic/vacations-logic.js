const vacationsDal = require('../dal/vacations-dal');
const pushLogic = require('./push-logic');

async function getAllVacations(userId) {
    const vacations = await vacationsDal.getAllVacation(userId);
    return vacations;
}

async function addVacation(vacationData) {
    const vacationId = await vacationsDal.addVacation(vacationData);
    vacationData = { id: vacationId, ...vacationData, isLiked: 0, vacationLikes: 0 };
    pushLogic.broadcast("add-vacation", vacationData);
    return vacationId;
}

async function deleteVacation(vacationId) {
    const vacation = await vacationsDal.deleteVacation(vacationId);
    pushLogic.broadcast("delete-vacation", vacationId);
    return vacation;
}

async function updateVacation(vacationData) {
    const vacation = await vacationsDal.updateVacation(vacationData);
    pushLogic.broadcast("update-vacation", vacationData);
    return vacation;
}

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation,
    updateVacation
};