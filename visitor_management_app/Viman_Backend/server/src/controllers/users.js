const userModel = require('../models/users');
const Response = require('../helpers/response');
const bcrypt = require('bcrypt');
const Type = require('../utils/userTypes');
const { DEFAULT_PASSWORD,APP_KEY, BACK_END_URL } = process.env;
const { validationResult } = require('express-validator');
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const usersController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            if (users.length > 0) {
                return Response.responseStatus(res, 200, 'List of all users', users);
            } else {
                return Response.responseStatus(res, 404, 'User not exists');
            }
        } catch (error) {
            console.log(error);
            return Response.responseStatus(res, 500, 'Internal server error', { error: error.message });
        }
    },
    getUserByUserId: async (req, res) => {
        try {
            const user_id = req.params.user_id;
            const user = await userModel.getUsersByCondition({ user_id });
            if (user.length > 0) {
                return Response.responseStatus(res, 200, `Details of User(${user_id})`, user);
            } else {
                return Response.responseStatus(res, 404, 'User not exists');
            }
        } catch (error) {
            console.log(error);
            return Response.responseStatus(res, 500, 'Internal server error', { error: error });
        }
    },

    createUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            
            const { empCode, name, email, phone, password = DEFAULT_PASSWORD, userType = Type.User } = req.body;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            
            const user = {
                emp_code: empCode,
                name,
                phone,
                email,
                password: hashedPassword,
                user_type: userType,
            };
            
            const result_email = await userModel.getUsersByCondition({ email });
            if (result_email.length > 0) {
                return Response.responseStatus(res, 409, 'Email already exists');
            }
            
            const createdUser = await userModel.createUser(user);
            if (createdUser.insertId > 0) {
                // Send email confirmation
                const token = jwt.sign({ user_id: createdUser.insertId }, APP_KEY);

                const mailSubject = "Account Confirmation - Viman Application";
                const mailContent = `
                    <p>Hi ${name},</p>
                    <p>Your account has been created successfully in the Viman application.</p>
                    <p>Here are your login credentials:</p>
                    <p><strong>Username:</strong> ${email}</p>
                    <p><strong>Password:</strong> ${password}</p>
                    <p>You can use these credentials to log in to your account.</p>
                    <p>If you have any questions or need further assistance, please feel free to contact us.</p>
                `;

                
                sendMail(email, mailSubject, mailContent, async (error, info) => {
                    if (error) {
                        console.log(error);
                        return Response.responseStatus(res, 500, "Failed to send confirmation email");
                    } else {
                        console.log('Confirmation email sent successfully!', info.response);
                        return Response.responseStatus(res, 201, "User Created Successfully", createdUser);
                    }
                });
            } else {
                return Response.responseStatus(res, 400, "User Creation Failed");
            }
        } catch (error) {
            console.log(error);
            return Response.responseStatus(res, 500, 'Internal server error', { error: error.message });
        }
    },
    
    updateUserByUserId: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            const user_id = req.params.user_id;
            const { empCode, name, email, phone, password, isActive, userType } = req.body;
            const user = {
                emp_code: empCode,
                name,
                phone,
                email,
                password,
                user_type: userType,
                is_active: isActive,
            };
            // Hash the password before storing in the database
            const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
            user.password = hashedPassword;
            const result = await userModel.updateUserByCondition({ user_id }, user);
            if (result.affectedRows > 0) {
                return Response.responseStatus(res, 200, `User Updated Successfully(${user_id})`);
            } else {
                return Response.responseStatus(res, 404, `Failed To Update User(${user_id})`);
            }
        } catch (error) {
            console.log(error);
            return Response.responseStatus(res, 500, 'Internal server error', { error: error.message });
        }
    },
    deleteUserByUserId: async (req, res) => {
        try {
            const user_id = req.params.user_id;
            const result = await userModel.deleteUserByCondition({ user_id });
            if (result.affectedRows > 0) {
                return Response.responseStatus(res, 200, `User Deleted Successfully(${user_id})`);
            } else {
                return Response.responseStatus(res, 404, `Failed To Delete User(${user_id})`);
            }
        } catch (error) {
            console.log(error);
            return Response.responseStatus(res, 500, 'Internal server error', { error: error.message });
        }
    }
};

module.exports = usersController;
