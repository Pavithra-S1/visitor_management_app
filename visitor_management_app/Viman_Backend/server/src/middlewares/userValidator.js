const { check } = require("express-validator");
const Type = require("../utils/userTypes");

const validation = {
  createUserSchema: [
    check("empCode")
      .exists()
      .withMessage("Employee Code is required")
      .notEmpty()
      .withMessage("Employee Code should not be empty")
      .isLength({ max: 10 })
      .withMessage("Employee Code should not exceed 10 characters"),
    check("name")
      .exists()
      .withMessage("Name is required")
      .notEmpty()
      .withMessage("Name should not be empty")
      .isLength({ max: 100 })
      .withMessage("Name should not exceed 100 characters"),
    check("phone")
      .exists()
      .withMessage("Phone is required")
      .notEmpty()
      .withMessage("Phone should not be empty")
      .isLength({ max: 11 })
      .withMessage("Phone should not exceed 11 characters"),
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail()
      .isLength({ max: 100 })
      .withMessage("Email should not exceed 100 characters"),
    check("userType")
      .optional()
      .isIn(['SuperAdmin', 'Admin', 'Visitor', 'Host'])
      .withMessage("Invalid User Type"),
  ],
  validateLogin: [
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail()
      .isLength({ max: 100 })
      .withMessage("Email should not exceed 100 characters"),
    check("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password must be filled"),
  ],
};

module.exports = validation;
