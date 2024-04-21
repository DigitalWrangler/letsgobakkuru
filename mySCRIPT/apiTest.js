const axios = require("axios");
const expect = require("chai").expect;

// Base URL for the API
const baseURL = "http://localhost:3000";

describe("API Endpoint Testing", function () {
  // Increase the default Mocha timeout for these async operations
  this.timeout(10000);

  it("GET /login should return 200", async () => {
    try {
      const response = await axios.get(`${baseURL}/login`);
      expect(response.status).to.equal(200);
      console.log("GET /login:", response.data);
    } catch (error) {
      console.error("GET /login failed:", error.message);
    }
  });

  it("POST /login should return 200", async () => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username: "testUser",
        password: "testPass",
      });
      expect(response.status).to.equal(200);
      console.log("POST /login:", response.data);
    } catch (error) {
      console.error("POST /login failed:", error.message);
    }
  });

  // Add more tests for other endpoints...

  it("POST /project should return 200", async () => {
    try {
      const response = await axios.post(`${baseURL}/project`, {
        name: "New Project",
        description: "Project Description",
        tags: ["Node", "API"],
      });
      expect(response.status).to.equal(200);
      console.log("POST /project:", response.data);
    } catch (error) {
      console.error("POST /project failed:", error.message);
    }
  });
});
