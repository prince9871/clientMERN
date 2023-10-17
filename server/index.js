const express = require("express");
const mongoose = require("mongoose");
const studentModel = require("./model");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://5fz6p6-3002.csb.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://prince9871:BZjeaWxY1uTLCefz@cluster0.pelsn1m.mongodb.net/StudentDataCrud`,
  )
  .then(() => console.log("mongoDb Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.json({ message: "welcome to student Data Home " });
});

app.get("/student", async (req, res) => {
  try {
    console.log("comin inside backed on get all data");
    const users = await studentModel.find();
    console.log("find all");
    console.log(users);
    return res.json({ message: "data fetched", data: users });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

app.post("/student", async (req, res) => {
  try {
    let store = req.body;

    console.log(store);
    let studentData = await studentModel.create(store);
    return res.status(201).json({
      message: "Student Data Created Successfully",
      data: studentData,
    });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
});

app.put("/student", async (req, res) => {
  try {
    const { id, name, age } = req.body;
    
    // Validate if id, name, and age are provided in the request body
    if (!id || !name || !age) {
      return res.status(400).json({ message: "ID, name, and age are required fields." });
    }

    // Find and update the student data based on the provided id
    let studentData = await studentModel.findOneAndUpdate(
      { _id: id },
      { name: name, age: age },
      { new: true } // This option returns the updated document
    );

    // Check if the student with the provided id exists in the database
    if (!studentData) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({
      message: "Student Data Updated Successfully",
      data: studentData,
    });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
});





app.delete("/student", async (req, res) => {
  try {
    const { id } = req.body; // Get id from the request body
    console.log('coming in delete function backend');
    console.log(id);
    let studentData = await studentModel.findOneAndDelete({ _id: id });
    if (studentData) {
      console.log('deleted')
      return res.status(200).json({
        message: "Student Data Deleted Successfully",
        data: studentData,
      });
    } else {
      console.log('not delete d')
      return res.status(404).json({
        message: "Student not found",
      });
    }
  } catch (err) {
    console.log('error occured while deleting studnet',err.message)
    return res.status(500).json({ status: false, error: err.message });
  }
});


app.listen(3001, () => console.log("port connected " + 3001));
