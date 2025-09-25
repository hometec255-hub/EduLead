const pool = require('../config/db');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM students WHERE id=$1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create student
const createStudent = async (req, res) => {
  const { student_name, date_of_birth, education_level, interests } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (student_name, date_of_birth, education_level, interests) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_name, date_of_birth, education_level, interests]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { student_name, date_of_birth, education_level, interests } = req.body;
  try {
    const result = await pool.query(
      'UPDATE students SET student_name=$1, date_of_birth=$2, education_level=$3, interests=$4 WHERE id=$5 RETURNING *',
      [student_name, date_of_birth, education_level, interests, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM students WHERE id=$1', [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};