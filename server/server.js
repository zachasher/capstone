const express = require("express");
const knex = require("knex")(require("./knexfile"));

const app = express();
require("dotenv").config();

app.use(express.json());

const { PORT } = process.env;

const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  // send some text back as a response
  res.send("Express is running!");
});

app.get("/test", (req, res) => {
  // send some text back as a response
  res.send("Express is testing!");
});

//RETURN ALL CLASSES
app.get("/classes", (_req, res) => {
  knex("classes")
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Unable to retrieve classes" });
    });
});

//RETURN A SINGLE CLASS FROM ID
app.get("/classes/:id", (req, res) => {
  const classId = req.params.id;

  knex("classes")
    .where({ id: classId })
    .first()
    .then((singleclass) => {
      if (singleclass) {
        res.status(200).json(singleclass);
      } else {
        res.status(404).json({ message: "Class not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Unable to retrieve class" });
    });
});

//ADD A NEW CLASS
app.post("/classes", (req, res) => {
  //Check if any class details have been missed
  if (
    !req.body.class_name ||
    !req.body.day ||
    !req.body.time ||
    !req.body.instructor ||
    !req.body.description
  ) {
    res.status(400).json({ message: "Please fill out all class details" });
  } else {
    //Once all validation is complete, send data to server or catch error
    knex("classes")
      .insert(req.body)
      .then((data) => {
        res.status(200).json(data[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error creating class" });
      });
  }
});

// start Express on chosen port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("Press CTRL + C to stop server");
});
