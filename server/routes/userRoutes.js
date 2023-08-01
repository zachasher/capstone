const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ## POST /users/register
// - Creates a new user.
// - Expected body: { first_name, last_name, email, password }
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password);

  // Create the new user
  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    type: "member",
  };

  // Insert it into our database
  try {
    await knex("users").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed registration");
  }
});

// ## POST /users/login
// -   Generates and responds a JWT for the user to use for future authorization.
// -   Expected body: { email, password }
// -   Response format: { token: "JWT_TOKEN_HERE" }
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  // Find the user
  const user = await knex("users").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  // Validate the password
  let isPasswordCorrect = false;
  if (user.type === "admin") {
    isPasswordCorrect = user.password === password; // Non-encrypted comparison for admin
  } else {
    // For regular members, use encrypted password
    isPasswordCorrect = bcrypt.compareSync(password, user.password);
  }

  // Generate a token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.json({ token });
});

// ## GET /users/current
// -   Gets information about the currently logged in user.
// -   If no valid JWT is provided, this route will respond with 401 Unauthorized.
// -   Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
router.get("/current", async (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  // Verify the token
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Respond with the appropriate user data
    const user = await knex("users").where({ id: decoded.id }).first();
    delete user.password;
    res.json(user);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
});

// GET ALL CLASSES FOR A PARTICULAR MEMBER
router.get("/:userId/classes", (req, res) => {
  const userId = req.params.userId;

  knex
    .from("user_classes")
    .where({ user_id: userId }) // Filter user_classes by user_id
    .innerJoin("classes", "user_classes.class_id", "classes.id") // Join with classes table on class_id
    .select("classes.*") // Select all columns from the classes table
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "No classes found for the user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// ADD CLASSES TO A MEMBER'S PROFILE
router.post("/:userId/classes/:classId", (req, res) => {
  const userId = req.params.userId;
  const classId = req.params.classId;

  // Check if the class exists
  knex("classes")
    .where({ id: classId })
    .first()
    .then((classData) => {
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      // Check if the user already has the class in their profile
      knex("user_classes")
        .where({ user_id: userId, class_id: classId })
        .first()
        .then((userClassData) => {
          if (userClassData) {
            // The class is already added to the user's profile
            return res
              .status(409)
              .json({ message: "Class already added to profile" });
          }

          // Insert into USER_CLASSES table (both user id and class id)
          knex("user_classes")
            .insert({ user_id: userId, class_id: classId })
            .then(() => {
              res.status(200).json({ message: "Class added to profile" });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({ message: "Failed to add class to profile" });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
