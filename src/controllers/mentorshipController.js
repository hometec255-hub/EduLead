const pool = require('../config/db');

// Get all mentorships
const getAllMentorships = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mentorships ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create mentorship
const createMentorship = async (req, res) => {
  const { student_id, topic, description, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mentorships (student_id, topic, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [student_id, topic, description, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update mentorship
const updateMentorship = async (req, res) => {
  const { id } = req.params;
  const { topic, description, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE mentorships SET topic=$1, description=$2, start_date=$3, end_date=$4 WHERE id=$5 RETURNING *',
      [topic, description, start_date, end_date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete mentorship
const deleteMentorship = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM mentorships WHERE id=$1', [id]);
    res.json({ message: 'Mentorship deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMentorships,
  createMentorship,
  updateMentorship,
  deleteMentorship
};
