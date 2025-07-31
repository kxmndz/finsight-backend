require("dotenv").config(); // Load environment variables
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGPTResponse(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or 'gpt-4o', etc.
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
}

module.exports.runSim = async function (inputData) {
  const {
    project_name,
    target_segment,
    key_features,
    market_conditions,
    compliance_notes,
  } = inputData;

  const prompt = `You are an AI simulation engine assisting in evaluating early-stage MSME product ideas within a financial institution. Based on the provided pitch, analyze its market viability, risk level, and compliance alignment. Return your evaluation in structured JSON format.

  ### Your Task:

  Provide a JSON response with the following structure:

  {
    sim_results: {
      market_fit: {
        score: (float between 0.0 and 10.0),
        justification: (short professional explanation)
      },
      risk_level: {
        category: "low" | "medium" | "high",
        justification: (brief rationale for risk assessment)
      },
      compliance_status: {
        category: "passed" | "review" | "pending",
        justification: (brief explanation of compliance concerns or approvals)
      }
    }
  }

  ### Evaluation Inputs:

  project_name: ${project_name}
  target_segment: ${target_segment}
  key_features: ${key_features}
  market_conditions: ${market_conditions}
  compliance_notes: ${compliance_notes}

  Ensure that your response is clear, well-justified, and free from informal or speculative language. You are acting as a decision-support system, not a creative writer.

  Only respond with **valid JSON**.
`;

  const data = JSON.parse(await getChatGPTResponse(prompt));

  return data;
};
