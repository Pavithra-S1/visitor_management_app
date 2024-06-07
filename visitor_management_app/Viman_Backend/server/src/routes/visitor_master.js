const express = require("express");
const VisitorController = require("../controllers/visitor_master");
const authMiddleware = require("../middlewares/auth");
const Type = require("../utils/userTypes");
const router = express.Router();
const validation = require("../middlewares/visitor_master");

router.route("/visitor_list").get(authMiddleware.authCheck, VisitorController.listVisitors);

router
    .route("/visitors_master")
    .get(VisitorController.getAllVisitors)
    .post(validation.createVisitorData, VisitorController.createVisitor);

router
    .route("/visitors_master/:visitor_id")
    .put(VisitorController.updateVisitorById)
    .delete(VisitorController.deleteVisitorById);

// New routes for retrieving visitors by phone, email, and name
router.route("/visitors_master/:visitor_id").get(VisitorController.getVisitorById);
router.route("/visitors_master/phone/:phone").get(VisitorController.getVisitorByPhone);
router.route("/visitors_master/email/:email").get(VisitorController.getVisitorByEmail);
router.route("/visitors_master/name/:name").get(VisitorController.getVisitorByName);

module.exports = router;
