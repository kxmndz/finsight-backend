const express = require("express");
const { SimStorage } = require("./sims.js");

// Create an instance of the express application
const app = express();
const port = 62708; // hex f4f4

// custom class (at bottom of this file) for easier data management
const sims = new SimStorage();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded bodies from incoming requests
app.use(express.urlencoded({ extended: true }));

// static serve everything in public/
app.use(express.static("public"));

// test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// get all sims
app.get("/api/get-all-sims", (req, res) => {
  res.json({
    data: sims.fetchAll(),
    timestamp: new Date().toISOString(),
  });
});

// get info on a specific sim
app.get("/api/get-sim/:simId", (req, res) => {
  // Send a JSON response to the client
  const simId = req.params.simId;
  res.json({
    data: sims.fetch(simId),
    timestamp: new Date().toISOString(),
  });
});

// make a new sim
app.post("/api/new-sim", (req, res) => {
  const {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  } = req.params;

  const inputdata = {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  };

  const output = runSim(inputData);

  sims.addNew(output);
  res.json({
    message: "Data received successfully!",
    yourData: req.body,
  });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  // Log a message to the console once the server starts
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Press Ctrl+C to stop the server.");
});

function runSim(inputData) {
  const {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  } = inputData;

  // TODO: implement prompt
}

function testData() {
  const testSim = {
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
