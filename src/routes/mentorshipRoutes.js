const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorshipController');

router.get('/', mentorshipController.getAllMentorships);
router.post('/', mentorshipController.createMentorship);
router.put('/:id', mentorshipController.updateMentorship);  // ✅ fixed
router.delete('/:id', mentorshipController.deleteMentorship);
module.exports = router;
