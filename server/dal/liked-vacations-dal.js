let connection = require("./connection-wrapper");

async function likeVacation(likeDetails) {
    let sql = "INSERT INTO `vacation_likes` (`user_id`, `vacation_id`) VALUES (?, ?)";
    let parameters = [likeDetails.userId, likeDetails.vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function dislikeVacation(dislikeDetails) {
    let sql = "DELETE FROM `vacation_likes` WHERE (`user_id` = ?) and (`vacation_id` = ?)";
    let parameters = [dislikeDetails.userId, dislikeDetails.vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function getDataForChart() {
    let sql = "SELECT v.id, v.city, COUNT(vacation_likes.vacation_id) AS vacationLikes FROM vacations v LEFT JOIN vacation_likes ON v.id = vacation_likes.vacation_id GROUP BY v.id ORDER BY v.id ASC";
    let result = await connection.execute(sql);
    return result;
}

module.exports = {
    likeVacation,
    dislikeVacation,
    getDataForChart
};