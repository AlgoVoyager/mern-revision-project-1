require("dotenv").config();
const express = require('express')
const cors = require('cors')
const taskRouter = require('./routes/task');
const mongoConnection = require("./config/db");
const app = express();
const PORT = process.env.PORT;

mongoConnection();

app.use(cors());
app.use(express.json());

app.use('/api/task',taskRouter);

app.listen(PORT,()=>{
    console.log("server running.");
})