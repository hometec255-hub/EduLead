const pool = require('../config/db');

const getAllResources = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resources ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createResource = async (req, res) => {
  const { title, description, file_url, created_by } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO resources (title, description, file_url, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, file_url, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllResources, createResource };
