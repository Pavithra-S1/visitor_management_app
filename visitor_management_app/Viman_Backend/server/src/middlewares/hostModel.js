    const { check } = require("express-validator");

    const HostDataValidation = {
    createHostData: [
        check("emp_code")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Employee Code exceeds maximum length"),
        check("name")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Name exceeds maximum length"),
        check("email")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email format")
        .isLength({ max: 45 })
        .withMessage("Email exceeds maximum length"),
        check("phone")
        .notEmpty()
        .withMessage("Phone cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Phone exceeds maximum length"),
        check("department")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Department exceeds maximum length"),
        check("availability")
        .optional()
        .isBoolean()
        .withMessage("Availability must be a boolean"),
    ],
    updateHostData: [
        check("emp_code")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Employee Code exceeds maximum length"),
        check("name")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Name exceeds maximum length"),
        check("email")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email format")
        .isLength({ max: 45 })
        .withMessage("Email exceeds maximum length"),
        check("phone")
        .notEmpty()
        .withMessage("Phone cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Phone exceeds maximum length"),
        check("department")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Department exceeds maximum length"),
        check("availability")
        .optional()
        .isBoolean()
        .withMessage("Availability must be a boolean"),
    ],
    };

    module.exports = HostDataValidation;
