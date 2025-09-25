const pool = require('../config/db'); // PostgreSQL connection

// Get all institutions
const getAllInstitutions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM institutions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get institution by ID
const getInstitutionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM institutions WHERE id=$1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create institution
const createInstitution = async (req, res) => {
  const { name, country, website } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO institutions (name, country, website) VALUES ($1, $2, $3) RETURNING *',
      [name, country, website]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update institution
const updateInstitution = async (req, res) => {
  const { id } = req.params;
  const { name, country, website } = req.body;
  try {
    const result = await pool.query(
      'UPDATE institutions SET name=$1, country=$2, website=$3 WHERE id=$4 RETURNING *',
      [name, country, website, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete institution
const deleteInstitution = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM institutions WHERE id=$1', [id]);
    res.json({ message: 'Institution deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
  deleteInstitution
};