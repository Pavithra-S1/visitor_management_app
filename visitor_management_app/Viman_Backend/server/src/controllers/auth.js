const userModel = require('../models/users');
const loginHistoryModel = require('../models/login_history');
const bcrypt = require("bcrypt");
const { FRONT_END_URL, APP_KEY, DEFAULT_PASSWORD } = process.env;
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const Response = require("../helpers/response");
const { validationResult } = require("express-validator");
const saltRounds = 10;

const authController = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Response.responseStatus(res, 400, "Validation Failed", errors);
      }
      const { email, password } = req.body;
      const existingUser = await userModel.getUsersByCondition({ email });
      if (existingUser.length > 0) {
        if (!Boolean(existingUser[0].is_active)) {
          return Response.responseStatus(res, 401, "Inactive user");
        }
        const compare = await bcrypt.compare(
          password,
          existingUser[0].password
        );
        if (compare) {
          const { user_id } = existingUser[0];
          const history = await loginHistoryModel.createLoginHistory({ user_id, status:'Logged-In'});
          const token = jwt.sign({ user_id, session_id: history.insertId }, APP_KEY);
          return res.status(200).json({
            status: true,
            message: "Login successfully",
            session_id: history.insertId,
            token,
            user_data: existingUser[0],
          });
        } else {
          return Response.responseStatus(res, 401, "Incorrect password");
        }
      } else {
        return Response.responseStatus(res, 401, "Incorrect email");
      }
    } catch (error) {
      console.log(error.message);
      return Response.responseStatus(res, 400, "Bad request", {
        error: error.message,
      });
    }
  },
  logout:async (req, res) => {
    try{
      const data = req.userData;
      const result = await loginHistoryModel.updateStatusById(data.session_id,"Logged-Out");
      if(result.affectedRows>0){
        return Response.responseStatus(res,200,"Logout successfully");
      }else{
        return Response.responseStatus(res,401,"Logout unsuccessfull");
      }
    }catch(error){
      console.error("Error during logout:", error.message);
      return Response.responseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.getUsersByCondition({ email });

      if (!user.length > 0){
        return Response.responseStatus(res, 404, "Email not exist");
      }

      const token = jwt.sign({ user: user[0] }, APP_KEY, { expiresIn: "30m",});
      const resetLink = `${FRONT_END_URL}/reset_password/${token}`;

      const mailSubject = 'Password Reset Request - Refex Contacts';
      const mailContent = `
      <p>Dear ${user[0].name},</p>
      <p>We have received a request to reset your password for Refex Contacts. To proceed, please click the following link:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not initiate this password reset, kindly disregard this email.</p>
      <p>Thank you for using Refex Contacts.</p>
      <div style="text-align: center;">
        <a href="#">
          <img src="http:localhost:3001/assets/Refex-Logo.png" alt="Refex Contacts" style="max-width: 100px;">
        </a>
      </div>
      `;
        
      sendMail(email, mailSubject, mailContent,(error, info)=>{
        if(error){
          return Response.responseStatus(res, 400, "Password reset link mail failed to send",error);
        }else{
          return Response.responseStatus(res, 200, "Password reset link mail sent successfully",info);
        }
      });

    } catch (error) {
      console.log(error.message);
      return Response.responseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const {password, confirm_password} = req.body;
      if(password !== confirm_password){
        return Response.responseStatus(res,400,"Password and confirm password doesn't match");
      }
      const hashedPassword = bcrypt.hashSync(confirm_password, saltRounds);
      // Verify token
      const decoded = jwt.verify(token, APP_KEY);
      const result = await userModel.updateUserByCondition({ user_id: decoded.user.user_id },{password:hashedPassword});
      if(result.affectedRows>0){
        return Response.responseStatus(res,200,"Password reseted successfully");
      }else{
        return Response.responseStatus(res,400,"Password reset failed");
      }
    } catch (error) {
      console.log(error.message);
      return Response.responseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  verifyToken: async (req,res) =>{
    try {
      const {token} = req.params;
      // Verify token
      const decoded = jwt.verify(token, APP_KEY);
      return Response.responseStatus(res,200,"Valid Token", decoded);
    } catch (error) {
      if(error.name === 'TokenExpiredError'){
        return Response.responseStatus(res,401,"Token has expired!");
      }else{
        return Response.responseStatus(res,401,"Invalid token!");
      }
    }
  },
};

module.exports = authController;
