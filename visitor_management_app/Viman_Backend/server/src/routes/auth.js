const router = require("express").Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const {createUserSchema, validateLogin} = require('../middlewares/userValidator');

router.post("/login",validateLogin, authController.login);
router.post("/logout",authMiddleware.authCheck,authController.logout);
router.post("/forgot_password",authController.forgotPassword);
router.patch("/reset_password/:token",authController.resetPassword);
router.post("/verify_token/:token",authController.verifyToken);

module.exports = router;