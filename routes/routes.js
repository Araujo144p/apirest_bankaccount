var express = require("express");
const AccountController = require("../controllers/AccountController");
const StatementController = require("../controllers/StatementController");
var app = express();
var router = express.Router();

var alreadyExist = require("../middleware/alreadyExist")

router.get("/", AccountController.index);
router.post("/account", AccountController.newAccount);
router.post("/deposit", alreadyExist, StatementController.deposit);
router.get("/statement", alreadyExist, StatementController.show);
router.post("/withdraw", alreadyExist, StatementController.withdraw);
router.put("/account", alreadyExist, AccountController.update);
router.get("/account", alreadyExist, AccountController.account);
router.delete("/account", alreadyExist, AccountController.delete);

module.exports = router