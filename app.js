//import express & database
const express = require("express");
const dbConn = require("./Config/dbConnect");
const personSchema = require("./modeles/person.js");

// define port number and express module
const port = 5000;
const app = express();
// use json to be able to usejson files
app.use(express.json());
dbConn();

app.post("/addPerson", async (req, res) => {
  try {
    console.log(req.body);
    const newPerson = new personSchema(req.body);
    await newPerson.save();
    res.status(200).send("person created succesfully");
  } catch (error) {
    res.status(500).send("unable to add person");
    console.log(error);
  }
});

//API
app.get("/getpersonbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await personSchema.findById(id);
    person
      ? res.status(200).send(person)
      : res.status(404).send("cannot get person");
  } catch (error) {
    res.status(400).send("no persons");
    console.log(error);
  }
});

app.put("/updatepersonbyname/:name", async (req, res) => {
  try {
    const { name } = req.params;
    personSchema
      .findOneAndUpdate(
        { name: name },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
      .then((doc) => {
        res.send({ result: "userupdated", newuser: doc });
      });
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
});

app.delete("/deleteperson:/id", async (req, res) => {
  try {
    await personSchema.findByIdAndDelete(req.params.id);

    res.status(200).send("person deleted succesfully");
  } catch (error) {
    res.status(500).send("unable to delete person");
    console.log(error);
  }
});

//start server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(` server running on ..http://localhost:${port}`);
});
