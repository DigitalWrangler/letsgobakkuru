require("dotenv").config();
const axios = require("axios");

async function enhanceDescriptions(endpoints) {
  const enhancedEndpoints = await Promise.all(
    endpoints.map(async (endpoint) => {
      const prompt = `Describe what the ${endpoint.method} method for ${endpoint.path} in ${endpoint.file} does in a web application.`;
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "gpt-4", // Update the model to GPT-4
            prompt: prompt,
            max_tokens: 100,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );

        endpoint.description = response.data.choices[0].text.trim();
        return endpoint;
      } catch (error) {
        console.error("Failed to enhance description:", error);
        endpoint.description = "No description available.";
        return endpoint;
      }
    }),
  );

  return enhancedEndpoints;
}

// Assuming `endpoints` is defined and filled somewhere in your script
const endpoints = [
  { method: "GET", path: "/api/data", file: "dataRoute.js" },
  // Additional endpoints can be added here
];

enhanceDescriptions(endpoints).then((results) => {
  console.log(results);
});
