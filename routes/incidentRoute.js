var express = require("express")
var incidentController = require("../controllers/incidentController")

var router = express.Router()

router.post("/",incidentController.createIncident)

module.exports = router