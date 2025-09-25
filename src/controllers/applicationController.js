const pool = require('../config/db');

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY applied_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create application
const createApplication = async (req, res) => {
  const { scholarship_id, student_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO applications (scholarship_id, student_id) VALUES ($1,$2) RETURNING *',
      [scholarship_id, student_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status
const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE applications SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllApplications,
  createApplication,
  updateApplicationStatus
};
