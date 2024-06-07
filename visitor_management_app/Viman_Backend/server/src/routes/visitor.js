const express = require("express");
const VisitorController = require("../controllers/visitor");
const authMiddleware = require("../middlewares/auth");
const validation = require("../middlewares/visitor");

const router = express.Router();

router.route("/visitor_list").get(authMiddleware.authCheck, VisitorController.listVisitors);

router
    .route("/visitors")
    .get(VisitorController.getAllVisitors)
    .post(validation.createVisitorData, VisitorController.createVisitor);

router
    .route("/visitors/:id")
    .get(VisitorController.getVisitorById)
    .put(validation.updateVisitorData, VisitorController.updateVisitorById)
    .delete(VisitorController.deleteVisitorById);

module.exports = router;
