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
  //   const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  //   if (!isPasswordCorrect) {
  //     return res.status(400).send("Invalid password");
  //   }

  // Validate the password
  let isPasswordCorrect = false;

  // Check if the user is an admin and use non-encrypted comparison for admin's password
  if (user.type === "admin") {
    isPasswordCorrect = user.password === password; // Non-encrypted comparison for admin
  } else {
    // For regular members, use bcrypt compareSync
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

module.exports = router;
