const enhanceEndpointDescription = async (endpoint) => {
  const descriptionPrompt = `Describe the functionality of an API endpoint for ${endpoint.path} which allows a user to ${endpoint.method.toLowerCase()} data.`;
  endpoint.description = await openAIQuery(descriptionPrompt);
};

// Loop over each endpoint to enhance its description
const processEndpoints = async (endpoints) => {
  for (let endpoint of endpoints) {
    await enhanceEndpointDescription(endpoint);
  }
  writeDocumentationToFile(endpoints);
};

processEndpoints(endpoints);
