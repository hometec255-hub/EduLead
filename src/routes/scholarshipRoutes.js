const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

// Routes
router.get('/', scholarshipController.getAllScholarships);
router.get('/:id', scholarshipController.getScholarshipById);
router.post('/', scholarshipController.createScholarship);
router.put('/:id', scholarshipController.updateScholarship);
router.delete('/:id', scholarshipController.deleteScholarship);

module.exports = router;
