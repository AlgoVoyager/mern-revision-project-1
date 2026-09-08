const express = require('express')
const cors = require('cors')
const taskRouter = require('./routes/task')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/task',taskRouter);

app.listen(PORT,()=>{
    console.log("server running.");
})