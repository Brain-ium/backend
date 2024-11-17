const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { sendResponse } = require("../Utils/responseHandler");
const User = require("../models/user");

const register = async (req, res) => {
    try {
        const { name, password, email, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            sendResponse(res, 401);
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            password: encryptedPassword,
            email,
        });

        sendResponse(res, 201);
    } catch (error) {
        sendResponse(res, 500, error);
    }
};

const login = async (req, res) => {
    try {
        let user = null;
        const { email, password } = req.body;

        if (email) {
            user = await User.findOne({ email: email });
        }

        if (!user || !await bcrypt.compare(password, user.password)) {
            sendResponse(res, 404);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                const userToken = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30d",
                    }
                );

                sendResponse(res, 200, {
                    user,
                    token: userToken,
                });
            } else {
                sendResponse(res, 405);
            }
        }
    } catch (error) {
        sendResponse(res, 500, error);
    }
};

module.exports = {
    register,
    login,
};