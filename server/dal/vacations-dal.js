let connection = require("./connection-wrapper");

async function getAllVacation(userId) {
    let sql = `SELECT v.id, v.city, v.country, v.description, v.image_url as imageURL, v.price, v.start_date AS startDate, v.end_date AS endDate,
    ( SELECT COUNT(vl.vacation_id)
    FROM vacation_likes vl
    WHERE vl.vacation_id = v.id ) AS vacationLikes,
    CASE WHEN vacation_likes.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS isLiked
    FROM vacations v
    LEFT JOIN vacation_likes ON v.id = vacation_likes.vacation_id AND vacation_likes.user_id = ?
    GROUP BY v.id ORDER BY isLiked DESC, v.id ASC`;
    let parameters = [userId];
    let vacations = await connection.executeWithParameters(sql, parameters);
    return vacations;
}

async function addVacation(vacationData) {
    let sql = "INSERT INTO vacations (city, country, description, image_url, price, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let parameters = [vacationData.city, vacationData.country, vacationData.description, vacationData.imageURL, vacationData.price, vacationData.startDate, vacationData.endDate];
    let vacationResult = await connection.executeWithParameters(sql, parameters);
    return vacationResult.insertId;
}

async function updateVacation(vacationData) {
    let sql = "UPDATE vacations SET city = ?, country = ?, description = ?, image_url = ?, price = ?, start_date = ?, end_date =?  WHERE (id = ?)";
    let parameters = [vacationData.city, vacationData.country, vacationData.description, vacationData.imageURL, vacationData.price, vacationData.startDate, vacationData.endDate, vacationData.id];
    let vacationResult = await connection.executeWithParameters(sql, parameters);
    return vacationResult;
}

async function deleteVacation(vacationId) {
    let sql = "DELETE FROM vacations WHERE (id = ?)";
    let parameters = [vacationId];
    let vacationResult = await connection.executeWithParameters(sql, parameters);
    return vacationResult;
}


module.exports = {
    getAllVacation,
    addVacation,
    deleteVacation,
    updateVacation
};