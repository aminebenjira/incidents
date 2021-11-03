var express = require("express")
var serviceController = require("../controllers/serviceController")

var router = express.Router()

router.post("/",serviceController.createService)

module.exports = router