const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successfull"))
    .catch((err) => {
        console.log("Database connection error: ", err);
        process.exit(1);
    });
}

module.exports = connectDatabase