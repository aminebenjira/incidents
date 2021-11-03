const serviceModel = require("../models/service")
module.exports = {
    
    //this methode is used to create a service
    createService : async(req, res, next) => {
         try {
             let service = req.body
             let data = await serviceModel.create(service)
             res.status(201).json(data)
             
         }catch(err){
            return next(err)
        }      
    }
}