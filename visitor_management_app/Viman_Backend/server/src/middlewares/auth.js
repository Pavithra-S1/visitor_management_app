const jwt = require("jsonwebtoken");
const { APP_KEY } = process.env;
const userModel = require("../models/users");
const Response = require("../helpers/response");

exports.authCheck = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization && authorization.startsWith("Bearer")) {
            const token = authorization.substr(7);
            const data = jwt.verify(token, APP_KEY);
            if (data) {
                req.userData = data;
                return next();
            }
        }
        return Response.responseStatus(res, 401, "Authorization needed");
    } catch (error) {
        console.error("Error in authCheck:", error.message);
        return Response.responseStatus(res, 401, "Invalid Authorization");
    }
};

exports.authType = (type) => {
    return async (req, res, next) => {
        try {
            const { user_id } = req.userData;
            const user = await userModel.getUserById(user_id);
            if (user && user.user_type === type) {
                return next();
            } else {
                return Response.responseStatus(res, 403, "You don't have permission");
            }
        } catch (error) {
            console.error("Error in authType:", error.message);
            return Response.responseStatus(res, 500, "Internal server error");
        }
    };
};

exports.authAllowTypes = (types = []) => {
    return async (req, res, next) => {
        try {
            const { user_id } = req.userData;
            const user = await userModel.getUserById(user_id);
            if (user && types.includes(user.user_type)) {
                return next();
            } else {
                return Response.responseStatus(res, 403, "You don't have permission");
            }
        } catch (error) {
            console.error("Error in authAllowTypes:", error.message);
            return Response.responseStatus(res, 500, "Internal server error");
        }
    };
};
