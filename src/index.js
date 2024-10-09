const express = require("express");
const app = express(); 
const bodyParser = require("body-parser"); 

const path = require("path");
const { connection } = require("./connector");


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const router = express.Router();
const cors = require("cors"); 
app.use(cors());

//get api for orders
app.get(process.env.GET_REQUEST, function (req, res) {
  try {
    //get last bookin
    connection.findOne({}, {}, { sort: { _id: -1 } }, (error, data) => {
      if (error) {
        //it there is some error it will return error msg in response
        res.status(200).json({ error: error.message });
      } else {
        //respond send
        res
          .status(200)
          .json(
            data === null ? { message: "No Previous booking found" } : { data }
          );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post api for bookings insert data
app.post(process.env.POST_REQUEST, function (req, res) {
  console.log()
  const { movie, slot, seats } = req.body; //destructing
  //validation
  if (!movie || !slot || !seats) {
    res
      .status(400)
      .json({
        error: "Invalid Request, Please select a movie, slot and seats",
      });
  } else {
    let newDocument = new connection({
      movie: movie,
      slot: slot,
      seats: seats,
    });

    try {
      newDocument.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("The document has been added to the database!");
          res.status(200).json({ message: "Reservation Confirmed !" });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(" server error");
    }
  }
});

//default URL
app.get('/' , function (req, res) {
  try {
    //get last booking
res.send("BookMyShow is live!")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: " Server Error" });
  }
});

// Start server
app.listen(process.env.APP_PORT ? process.env.APP_PORT : 8080 , () => console.log(`App listening on port ${process.env.APP_PORT ? process.env.APP_PORT : 8080}!`));

module.exports = app;
