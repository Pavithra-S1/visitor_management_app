const router = require("express").Router();
const usersController = require("../controllers/users");
const validation = require("../middlewares/userValidator");
const Type = require("../utils/userTypes");
const authMiddleware = require("../middlewares/auth");

router
  .route("/users")
  .get(
    usersController.getAllUsers
  )
  .post(
    validation.createUserSchema,
    usersController.createUser
  );
router
  .route("/users/:user_id")
  .get(
    usersController.getUserByUserId
  )
  .put(
    validation.createUserSchema,
    usersController.updateUserByUserId
  )
  .delete(
    usersController.deleteUserByUserId
  );

module.exports = router;
