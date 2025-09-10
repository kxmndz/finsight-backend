const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
// const { SimStorage } = require("./models/Sim.js");
const Sim = require("./models/Sim")
const { runSim } = require("./openai.js");
const cors = require("cors");

// Create an instance of the express application
const app = express();
const port = 62708; // hex f4f4
const JWT_SECRET = "your_secret_key"; // Use env variable in production


// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded bodies from incoming requests
app.use(express.urlencoded({ extended: true }));
// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/finsight", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // <-- Extract token after "Bearer"
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// auth registration route
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists." });
  }
});

// auth login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected routes (require authentication)
// Get all sims for the logged-in user
app.get("/api/get-all-sims", authenticateToken, async (req, res) => {
  try {
    const sims = await Sim.find({ user: req.user.id });
    res.json({ data: sims, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch simulations." });
  }
});

// Get a specific sim by uuid (only if owned by user)
app.get("/api/get-sim/:simId", authenticateToken, async (req, res) => {
  try {
    const sim = await Sim.findOne({ uuid: req.params.simId, user: req.user.id });
    if (!sim) return res.status(404).json({ error: "Simulation not found." });
    res.json({ data: sim, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch simulation." });
  }
});

// Create a new sim
app.post("/api/new-sim", authenticateToken, async (req, res) => {
  const {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  } = req.body;

  // Define inputData for the LLM
  const inputData = {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  };

  // Generate sim_results using your LLM function
  const sim_results = await runSim(inputData); // should be ONLY the AI output
  const uuid = require("crypto").randomUUID();

  try {
    const sim = new Sim({
      uuid,
      user: req.user.id,
      project_name,
      target_segment,
      key_features,
      market_conditions,
      compliance_notes,
      sim_results,  // Just the AI output to prevent duplicating
    });
    await sim.save();
    res.json({ message: "Sim successfully added!", data: sim });
  } catch (err) {
    res.status(500).json({ error: "Failed to save simulation." });
  }
});

// Delete a sim (only if owned by user)
app.get("/api/delete-sim/:simId", authenticateToken, async (req, res) => {
  try {
    const result = await Sim.deleteOne({ uuid: req.params.simId, user: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Simulation not found or not authorized." });
    }
    res.json({ message: `Successfully deleted sim ${req.params.simId}`, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete simulation." });
  }
});

// custom class (at bottom of this file) for easier data management
// const sims = new SimStorage();

// static serve everything in public/
app.use(express.static("public"));

// test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  // Log a message to the console once the server starts
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Press Ctrl+C to stop the server.");
});

function testData() {
  const testSim = {
    uuid: "aaaa-aaaaaaaa-aaaa",
    project_name: "finsight",
    target_segment: "bank people??",
    key_features: "AI-powered market simulation for project ideas",
    market_conditions: "idk, i don't work in finance",
    compliance_notes: "submissive??",
    sim_results: {
      market_fit: { score: 3.7, justification: "i like 37" },
      risk_level: { category: "low", justification: "it's all pretend" },
      compliance_status: {
        category: "pending",
        justification: "idk what compliance means",
      },
    },
  };

  sims.addNew(testSim);
  console.log(sims.fetchAll());
}
// testData();
