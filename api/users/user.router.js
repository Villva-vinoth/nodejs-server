const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUsersDetails
} = require("./user.controller");

router.post("/", createUser);
router.post("/login", login);
router.get('/',checkToken,getUsersDetails);

module.exports = router;
