const express = require('express')
const router = express.Router();
const { createTask, getTasks, getTaskById } = require('../controllers/task');

router.post('/', createTask);
router.get('/', getTasks); 
router.get('/:id', getTaskById); 
// put patch delete remains

module.exports = router;