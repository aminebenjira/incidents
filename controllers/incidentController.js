const incidentModel = require("../models/incident")
const serviceModel = require("../models/service")
module.exports = {

    //this methode is used to create a service
    createIncident : async(req, res, next) => {
         try {
            var errors=[]
            if (!req.body.service){
                errors.push("No name specified");
            }
            if (!req.body.status){
                errors.push("No display name specified");
            }
            if (!req.body.description){
                errors.push("No description specified");
            }

            if (!req.body.issuedAt){
                errors.push("No description specified");
            }

            if (errors.length){
                res.status(400).json({"error":errors.join(",")});
                return err.message;
            }

             let incident = req.body;



             let service = await serviceModel.findOne({name: incident.service})
             if(!service){
                 return next({
                     status: 404,
                     message: "no service found with the given service name"
                 })
             }

             //we don't need to add service name again
             if(incident.service)
             delete incident["service"];

             let data = await incidentModel.create(incident);


             //push the incident in the service array incidents
             service.incidents.push(data)
             await service.save()
             console.log(service)
             res.status(201).json(data)

         }catch(err){
            return next(err)
        }
    }
}