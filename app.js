const express = require("express");
const Task = require("./Models/task");
const connectDB = require("./DB/Connect");
const app = express();

// config dotenv file
require("dotenv").config();

// input output are in json format
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Rajnish Assignment Server",
  });
});

app.get("/list", async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json({
      Task: allTask,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/add", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({
      Task: task,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const Start = async () => {
  try {
    await connectDB(process.env.db_link);
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port " + process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

Start();
