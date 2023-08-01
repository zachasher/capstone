const express = require("express");
const knex = require("knex")(require("./knexfile"));
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());

const { PORT } = process.env;

const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Routes
app.use("/users", userRoutes);

//test endpoint
app.get("/", (_req, res) => {
  res.send("Express is running!");
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
    // Check if a class with the same day and time already exists
    knex("classes")
      .where({ day: req.body.day, time: req.body.time })
      .first()
      .then((existingClass) => {
        if (existingClass) {
          // If a class with the same day and time exists, return an error
          res
            .status(409)
            .json({ message: "Class already exists at the same day and time" });
        } else {
          // If no class exists at the same day and time, insert the new class data
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
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error checking for existing class" });
      });
  }
});

// DELETE A CLASS
app.delete("/classes/:id", async (req, res) => {
  const classID = req.params.id;

  try {
    await knex.transaction(async (trx) => {
      // Delete from user_classes table where class_id matches
      await trx("user_classes").where("class_id", classID).del();

      // Delete from classes table where id matches
      await trx("classes").where("id", classID).del();

      res.status(200).json({ message: "Successfully deleted class and related user classes" });
    });
  } catch (err) {
    res.status(400).json({ message: "Error deleting class and related user classes" });
    console.log(err);
  }
});

// UPDATE/EDIT A CLASS
app.put("/classes/:id", (req, res) => {
  const classId = req.params.id;
  const updatedClassData = req.body;

  // Check if any class details have been missed
  if (
    !updatedClassData.class_name ||
    !updatedClassData.day ||
    !updatedClassData.time ||
    !updatedClassData.instructor ||
    !updatedClassData.description
  ) {
    res.status(400).json({ message: "Please fill out all class details" });
  } else {
    // Check if a class with the same day and time already exists
    knex("classes")
      .where({ day: updatedClassData.day, time: updatedClassData.time })
      .whereNot({ id: classId }) // Exclude the current class from the check
      .first()
      .then((existingClass) => {
        if (existingClass) {
          // If a class with the same day and time exists, return an error
          res.status(409).json({
            message: "Class already exists at the same day and time",
          });
        } else {
          // If no class exists at the same day and time, update the class data
          knex("classes")
            .where({ id: classId })
            .update(updatedClassData)
            .then(() => {
              res.status(200).json({ message: "Class updated successfully" });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Error updating class" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error checking for existing class" });
      });
  }
});

// START EXPRESS ON CHOSEN PORT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("Press CTRL + C to stop server");
});
