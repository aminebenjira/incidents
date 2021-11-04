const incidentModel = require("../models/incident")
const serviceModel = require("../models/service")
const fs = require('fs')
const { promisify } = require('util')

//to generate random string like ids
const { v4: uuidv4 } = require('uuid');

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


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
             


             let incidentFiles = await readFileAsync("./db/incident.json")
             let serviceFiles = await readFileAsync("./db/service.json")
             
             let serviceData = JSON.parse(serviceFiles).data
             let incidentData = JSON.parse(incidentFiles).data

             let serviceIndex = serviceData.findIndex(item => item.name===incident.service)
             console.log(serviceData[serviceIndex])
             if(serviceIndex!==-1){
                 if(!serviceData[serviceIndex].incidents){
                    serviceData[serviceIndex].incidents = []
                 }
                 incident.id = uuidv4();
                 const newIncident = Object.assign({}, incident) 
                 delete newIncident["service"]
                 serviceData[serviceIndex].incidents.push(newIncident)
                 serviceData.splice(serviceIndex,1, serviceData[serviceIndex])
                 incidentData.push(incident)
                 await writeFileAsync("./db/service.json",JSON.stringify({data:serviceData}))
                 await writeFileAsync("./db/incident.json",JSON.stringify({data:incidentData}))
                 return res.status(200).json(incident)
             }
             return next({
                 "status":404,
                 "message":"No service found for the incident"
             })

         }catch(err){
            return next(err)
        }
    },

    getIncidents: async(req,res)=>{
        try{

            let incidentsFiles = await readFileAsync("./db/incident.json")
            let data = JSON.parse(incidentsFiles).data
            res.status(200).json(data)
        }catch(err){
            return next(err)
        }
    },

    getIncidentById: async(req, res, next)=> {
        try {
           let id = req.params.id
           let incidentFile = await readFileAsync("./db/incident.json")
           let data = JSON.parse(incidentFile).data
           let incidentFound = data.find(incidentItem =>incidentItem.id===id);
           if(incidentFound){
               return res.status(201).json(incidentFound)
           }
           return next({
               "status": 404,
               "message": "No service found with the id " + id
           })

        }catch(err){
            return next(err)
    
        }   
     }
}