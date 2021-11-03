const incidentModel = require("../models/incident")
const serviceModel = require("../models/service")
module.exports = {
    
    //this methode is used to create a service
    createIncident : async(req, res, next) => {
         try {
             let incident = req.body
             let service = await serviceModel.findOne({name: incident.service})
             if(!service){
                 return next({
                     status: 404,
                     message: "no service found with the given service name" 
                 })
             }
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