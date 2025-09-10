const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { SimStorage } = require("./sims.js");
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

// protected routes (require authentication)
app.get("/api/get-all-sims", authenticateToken, (req, res) => {
  // console.log({ req })
  res.json({
    data: sims.fetchAll(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/get-sim/:simId", authenticateToken, (req, res) => {
  const simId = req.params.simId;
  res.json({
    data: sims.fetch(simId),
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/new-sim", authenticateToken, async (req, res) => {
  const {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  } = req.body;

  const inputData = {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  };

  const output = await runSim(inputData);

  sims.addNew(output);
  res.json({
    message: "Sim successfully added!",
    data: output,
    yourData: req.body,
  });
});

app.get("/api/delete-sim/:simId", authenticateToken, (req, res) => {
  const simId = req.params.simId;
  sims.removeSim(simId);
  res.json({
    message: `Successfully deleted sim ${simId}`,
    timestamp: new Date().toISOString(),
  });
});

// custom class (at bottom of this file) for easier data management
const sims = new SimStorage();

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
