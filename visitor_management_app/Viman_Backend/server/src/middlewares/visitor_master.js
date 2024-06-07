const { check } = require("express-validator");

const VisitorDataValidation = {
  createVisitorData: [
    check("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ max: 100 })
      .withMessage("Name exceeds maximum length"),
    check("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 100 })
      .withMessage("Email exceeds maximum length"),
    check("phone")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .isLength({ max: 10 })
      .withMessage("Phone exceeds maximum length"),

  ],
  updateVisitorData: [
    check("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ max: 100 })
      .withMessage("Name exceeds maximum length"),
    check("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 100 })
      .withMessage("Email exceeds maximum length"),
    check("phone")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .isLength({ max: 10 })
      .withMessage("Phone exceeds maximum length"),

  ],
};

module.exports = VisitorDataValidation;
