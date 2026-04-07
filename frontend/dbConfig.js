const mongoose = require('mongoose');
function dbConn() {
    const DB_URL = process.env.MONGODB_URL;
    mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error"));
    db.once("open", function () {
        console.log("DB Connected....");
    });
}
module.exports = dbConn;