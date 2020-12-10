const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());
const data = require("./InitialData.js");
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/api/student", (req, res) => {
  res.send(data);
});
app.get("/api/student/:id", (req, res) => {
  const id = req.params.id;
  let student = data.find((el) => el.id === parseInt(id));
  if (!student) {
    res.status(404).send("Error");
    return;
  }
  res.send(student);
});
app.post("/api/student", (req, res) => {
  const student = {
    id: data[data.length - 1].id + 1,
    ...req.body,
    currentClass: parseInt(req.body.currentClass)
  };
  if (!student.name || !student.currentClass || !student.division) {
    res.status(404).send();
    return;
  }
  data.push(student);
  let id = student.id;
  res.send({ id: id });
});
app.put("/api/student/:id", (req, res) => {
  const id = req.params.id;
  const student = data.find((el) => el.id === parseInt(id));
  if (!student) {
    res.status(400).send("Error");
  }
  const studentIndex = data.findIndex((student) => student.id === parseInt(id));
  const newstudent = {
    id: id,
    ...student,
    ...req.body
  };
  let classStudent = Number(newstudent.currentClass);
  newstudent.currentClass = classStudent;
  data.splice(studentIndex, 1, newstudent);
  res.send(newstudent.name);
});

app.delete("/api/student/:id", (req, res) => {
  const id = req.params.id;
  const studentIndex = data.findIndex((student) => parseInt(id) === student.id);
  if (studentIndex === -1) {
    res.status(404).send("Error");
    return;
  }
  data.splice(studentIndex, 1);
  res.status(200).send(`${id} is valid`);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
module.exports = app;
