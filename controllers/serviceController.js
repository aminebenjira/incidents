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

             let data = await serviceModel.create(service)
             res.status(201).json(data)

         }catch(err){
            return next(err)
        }
    },


        //this methode is used to create a service
        getServices : async(req, res, next) => {
            try {


                let service = req.body

                let data = await serviceModel.find()
                res.status(200).json(data)

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