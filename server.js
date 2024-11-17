const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

const { errorHandler } = require("./Middleware/errorHandler");
const connectDatabase = require("./Database/database")

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000/',
        '*'
    ],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV));
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(errorHandler);
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

connectDatabase();

app.use("/api/auth", require("./Routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("<h1>Backend Server is Running</h1>");
});

process.on('SIGINT', () => {
    console.log("Shutting down...");
    server.close(() => {
        console.log("Closed all connections");
        process.exit(0);
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}/`)
);

module.exports = app;