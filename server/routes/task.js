const express = require('express')
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTaskById, deleteTask } = require('../controllers/task');
const authentication = require('../middlewares/authentication');

router.post('/', authentication ,createTask);
router.get('/', authentication, getTasks); 
router.get('/:id', authentication, getTaskById); 
router.patch('/:id', authentication, updateTaskById); 
router.delete('/:id', authentication, deleteTask); 

module.exports = router;