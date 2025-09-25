const pool = require('../config/db'); // PostgreSQL connection

// Get all scholarships
const getAllScholarships = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scholarships ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get scholarship by ID
const getScholarshipById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM scholarships WHERE id=$1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create scholarship
const createScholarship = async (req, res) => {
  const {
    title,
    description,
    available_amount,
    rating,
    students_enrolled,
    duration,
    mode,
    start_date,
    level,
    skills
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO scholarships 
        (title, description, available_amount, rating, students_enrolled, duration, mode, start_date, level, skills)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        title,
        description,
        available_amount,
        rating,
        students_enrolled,
        duration,
        mode,
        start_date,
        level,
        skills // should be an array
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update scholarship
const updateScholarship = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    available_amount,
    rating,
    students_enrolled,
    duration,
    mode,
    start_date,
    level,
    skills
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE scholarships SET
        title=$1,
        description=$2,
        available_amount=$3,
        rating=$4,
        students_enrolled=$5,
        duration=$6,
        mode=$7,
        start_date=$8,
        level=$9,
        skills=$10
      WHERE id=$11 RETURNING *`,
      [
        title,
        description,
        available_amount,
        rating,
        students_enrolled,
        duration,
        mode,
        start_date,
        level,
        skills,
        id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete scholarship
const deleteScholarship = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM scholarships WHERE id=$1', [id]);
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship
};
