const express = require('express')
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTaskById, deleteTask } = require('../controllers/task');

router.post('/', createTask);
router.get('/', getTasks); 
router.get('/:id', getTaskById); 
router.patch('/:id', updateTaskById); 
router.delete('/:id', deleteTask); 

module.exports = router;