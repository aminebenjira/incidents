
const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const serviceModel = require("../models/service")
module.exports = {

    //this methode is used to create a service
    createService : async(req, res, next) => {
         try {
            var errors=[]
            if (!req.body.name){
                errors.push("No name specified");
            }
            if (!req.body.displayName){
                errors.push("No display name specified");
            }
            if (!req.body.description){
                errors.push("No description specified");
            }
            if (errors.length){
                res.status(400).json({"error":errors.join(",")});
                return err.message;
            }

             let service = req.body
            

             let serviceFiles = await readFileAsync("./db/service.json")
             let data = JSON.parse(serviceFiles).data
             let serviceFound = data.find(serviceItem =>serviceItem.name===service.name);
             if(!serviceFound){
                data.push(service)
                await writeFileAsync("./db/service.json",JSON.stringify({data:data}))
                return res.status(200).json(service)
             }
             return next({
                 "message":"the service with the name " +service.name + "Already found",
                 "status": 409
             })

             //let data = await serviceModel.create(service)
             //res.status(201).json(data)

         }catch(err){
            return next(err)
        }
    },


        //this methode is used to create a service
        getServices : async(req, res, next) => {
            try {


                let service = req.body

                //let data = await serviceModel.find()

                let serviceFiles = await readFileAsync("./db/service.json")
                let data = JSON.parse(serviceFiles).data
                res.status(200).json(data)

            }catch(err){
               return next(err)
           }
       },

       getServiceById: async(req, res, next)=> {
           try {
              let serviceName = req.params.name
              let serviceFile = await readFileAsync("./db/service.json")
              let data = JSON.parse(serviceFile).data
              let serviceFound = data.find(serviceItem =>serviceItem.name===serviceName);
              if(serviceFound){
                  return res.status(201).json(serviceFound)
              }
              return next({
                  "status": 404,
                  "message": "No service found with the name " + serviceName
              })

           }catch(err){
               return next(err)
           }
       },

        //this methode is used to create a service
        deleteServices : async(req, res, next) => {
            try {


                let data = await serviceModel.remove({})
                res.status(200).json(data)

            }catch(err){
               return next(err)
           }
       }
}