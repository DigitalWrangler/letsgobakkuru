const pool = require('../../dbConnect/connect');

async function incrementViewCount(req, res) {
  const { cookie } = req.body;
  if (!cookie) {
    return res.status(400).json({ error: 'Cookie is required in the request body' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const checkCookie = await client.query('SELECT * FROM user_visits WHERE cookie = $1', [cookie]);
    if (checkCookie.rows.length === 0) {
      await client.query('INSERT INTO user_visits (cookie, first_visit, last_visit, visit_count) VALUES ($1, NOW(), NOW(), 1)', [cookie]);
    } else {
      await client.query('UPDATE user_visits SET last_visit = NOW(), visit_count = visit_count + 1 WHERE cookie = $1', [cookie]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Cookie count incremented successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error handling cookie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
}


module.exports = { incrementViewCount };
