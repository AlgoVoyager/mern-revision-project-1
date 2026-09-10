const express = require('express')
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTaskById } = require('../controllers/task');

router.post('/', createTask);
router.get('/', getTasks); 
router.get('/:id', getTaskById); 
router.patch('/:id', updateTaskById); 
// put patch delete remains

module.exports = router;