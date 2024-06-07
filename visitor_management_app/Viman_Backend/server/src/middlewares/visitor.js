    const { check } = require("express-validator");

    const VisitorDataValidation = {
    createVisitorData: [
        check("visitor_id")
        .notEmpty()
        .withMessage("Visitor ID cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor ID exceeds maximum length"),
        check("host_id")
        .notEmpty()
        .withMessage("Host ID cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Host ID exceeds maximum length"),
        check("floor")
        .notEmpty()
        .withMessage("Floor cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Floor exceeds maximum length"),
        check("visitor_card_no")
        .notEmpty()
        .withMessage("Visitor Card No cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Card No exceeds maximum length"),
        check("purpose_of_visit")
        .notEmpty()
        .withMessage("Purpose of Visit cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Purpose of Visit exceeds maximum length"),
        check("comment")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Comment exceeds maximum length"),
        check("status")
        .notEmpty()
        .withMessage("Status cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Status exceeds maximum length"),
        check("visitor_token")
        .notEmpty()
        .withMessage("Visitor Token cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Token exceeds maximum length"),
        check("visitor_pass")
        .notEmpty()
        .withMessage("Visitor Pass cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Pass exceeds maximum length"),
        check("visitor_is_verifited")
        .notEmpty()
        .withMessage("Visitor is Verified cannot be empty"),
        check("date")
        .notEmpty()
        .withMessage("Date cannot be empty")
        .isISO8601()
        .withMessage("Invalid date format"),
    ],
    updateVisitorData: [
        check("visitor_id")
        .notEmpty()
        .withMessage("Visitor ID cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor ID exceeds maximum length"),
        check("host_id")
        .notEmpty()
        .withMessage("Host ID cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Host ID exceeds maximum length"),
        check("floor")
        .notEmpty()
        .withMessage("Floor cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Floor exceeds maximum length"),
        check("visitor_card_no")
        .notEmpty()
        .withMessage("Visitor Card No cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Card No exceeds maximum length"),
        check("purpose_of_visit")
        .notEmpty()
        .withMessage("Purpose of Visit cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Purpose of Visit exceeds maximum length"),
        check("comment")
        .optional()
        .isLength({ max: 45 })
        .withMessage("Comment exceeds maximum length"),
        check("status")
        .notEmpty()
        .withMessage("Status cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Status exceeds maximum length"),
        check("visitor_token")
        .notEmpty()
        .withMessage("Visitor Token cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Token exceeds maximum length"),
        check("visitor_pass")
        .notEmpty()
        .withMessage("Visitor Pass cannot be empty")
        .isLength({ max: 45 })
        .withMessage("Visitor Pass exceeds maximum length"),
        check("visitor_is_verifited")
        .notEmpty()
        .withMessage("Visitor is Verified cannot be empty"),
        check("date")
        .notEmpty()
        .withMessage("Date cannot be empty")
        .isISO8601()
        .withMessage("Invalid date format"),
    ],
    };

    module.exports = VisitorDataValidation;
