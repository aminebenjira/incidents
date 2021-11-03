var express = require("express")
var incidentController = require("../controllers/incidentController")

var router = express.Router()

router.post("/add",incidentController.createIncident)

module.exports = router