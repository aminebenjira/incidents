var express = require("express")
var incidentController = require("../controllers/incidentController")

var router = express.Router()

router.post("/add",incidentController.createIncident)
router.get("/all", incidentController.getIncidents)
router.get("/:id",incidentController.getIncidentById)

module.exports = router