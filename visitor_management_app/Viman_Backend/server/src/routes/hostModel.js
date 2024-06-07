    const express = require("express");
    const HostController = require("../controllers/hostModel");
    const authMiddleware = require("../middlewares/auth");
    const Type = require("../utils/userTypes");
    const router = express.Router();
    const validation = require("../middlewares/hostModel");

    router.route("/host_list").get(authMiddleware.authCheck, HostController.listHosts);

    router
    .route("/hosts")
    .get(HostController.getAllHosts)
    .post(validation.createHostData, HostController.createHost);

    router
    .route("/hosts/:host_id")
    .get(HostController.getHostById)
    .put(validation.updateHostData, HostController.updateHostById)
    .delete(HostController.deleteHostById);

    module.exports = router;
