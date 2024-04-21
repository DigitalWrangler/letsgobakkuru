const axios = require('axios');

async function testAPI() {
  try {
    // POST request to increment view count
    const postResponse = await axios.post('http://localhost:3000/increment-view-count', {
      cookie: 'user123'
    });
    console.log('Increment View Count Response:', postResponse.data);

    // GET request to fetch data
    const getDataResponse = await axios.get('http://localhost:3000/data');
    console.log('Fetch Data Response:', getDataResponse.data);

    // GET request to fetch user visits
    const getUserVisitsResponse = await axios.get('http://localhost:3000/user-visits/1'); // Change 1 to the actual ID
    console.log('Fetch User Visits Response:', getUserVisitsResponse.data);

  } catch (error) {
    console.error('Error during API Test:', error.response ? error.response.data : error.message);
  }
}

testAPI();
