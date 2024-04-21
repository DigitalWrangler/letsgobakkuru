const pool = require('../../dbConnect/connect');

async function fetchData(req, res) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT SUM(visit_count) AS total_count FROM user_visits');
    const totalViewCount = result.rows[0].total_count || 0; // Handle possible null values
    res.json({ totalViewCount });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
}

async function fetchUserVisits(req, res) {
  try {
    const userId = req.params.id;
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM user_visits WHERE id = $1', [userId]);
    client.release();

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User data not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { fetchData, fetchUserVisits };
