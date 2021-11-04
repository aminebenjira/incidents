var express = require("express")
var serviceController = require("../controllers/serviceController")

var router = express.Router()

router.post("/add",serviceController.createService)

router.get("/all",serviceController.getServices)
router.get("/:name", serviceController.getServiceById)

router.delete("/remove",serviceController.deleteServices)
module.exports = router