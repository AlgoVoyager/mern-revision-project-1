const express = require('express')
const router = express.Router();
const { createTask, getTasks } = require('../controllers/task');

router.post('/create', createTask);
router.get('/', getTasks);

module.exports = router;