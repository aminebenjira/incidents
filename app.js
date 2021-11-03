const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const ErrorResponse = require("http-errors")


//connect to database
mongoose.connect(
    "mongodb://localhost:27017/testServices",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
        if (!err) {
            console.log('Successfully Established Connection with database')
        }
        else {
            console.log('Failed to Establish Connection with database with Error: '+ err)
        }
    }
  );

let app = express();

let serviceRoute = require("./routes/serviceRoute")
let incidentRoute = require("./routes/incidentRoute")
// body parser middelware
app.use(bodyParser.json());

app.use("/service", serviceRoute)
app.use("/incident", incidentRoute)


app.use((req, res, next) => {
    return next(ErrorResponse(404))
})

app.use((err, req, res , next) => {
    console.log(err)
    return res.status(err.status || 500).send(err.message)
})



app.listen(3000, () => {
    console.log("server listinig on port", 3000)
})