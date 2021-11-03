const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {

    status: {
      type: Number,
      required: true
    },
    description: {
      type: String,
    },
    issuedAt: {
        type: Date, // saved in isoDate format (ie  "2021-11-01")
        default: Date.now
    }
  }
);

// schema.pre('save',function(next){
//    let incident = this;
//    if(incident.issuedAt){
//        incident.duration = new Date() - new Date(incident.issuedAt)
//    }
//    next()
// })

module.exports = mongoose.model("Incident", schema);