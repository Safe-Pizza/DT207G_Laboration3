//paket
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//variabel för express
const app = express();

//variabel för port
const port = process.env.PORT;

//
const dbURI = process.env.MONGODB_URI;

//cross-origin
app.use(cors());

//Parse JSON
app.use(express.json());

//Anslutning databas
mongoose.connect(dbURI).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Connection failure" + error);
})

//Schema för jobb
const schema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, `Companyname is required`]
    },
    jobtitle: {
        type: String,
        required: [true, `Jobtitle is required`]
    },
    location: {
        type: String,
        required: [true, `Location is required`]
    },
    description: {
        type: String,
        required: [true, `Description is required`]
    },
    startdate: {
        type: String,
        required: [true, `Startdate is required`],
        match: [/^\d{4}-\d{2}-\d{2}$/, `Not a valid date, format: XXXX-XX-XX`] //validering av korrekt datumformat
    },
    enddate: {
        type: String,
        required: [true, `Enddate is required`],
        match: [/^\d{4}-\d{2}-\d{2}$/, `Not a valid date, format: XXXX-XX-XX`] //validering av korrekt datumformat
    },
}, { timestamps: true });

//Applicera schema på collection
const Job = mongoose.model("Job", schema);

//Routes
app.get("/", async (req, res) => {
    res.json({ message: `Welcome to API for jobs` });
});

app.get("/jobs", async (req, res) => {
    try {
        let result = await Job.find({}); //Query för att hämta alla jobb'

        //kontroll om databas saknar data
        if (result.length === 0) {
            res.status(404).json({ message: "No jobs found" });
        } else {
            return res.json(result); //returnera response med alla jobb
        }
    } catch (error) {
        return res.status(500).json(error); // felmeddelande
    }
});

app.get("/jobs/:id", async (req, res) => {

    try {
        let result = await Job.find({ _id: req.params.id }); //query för att hämta specifikt jobb
        if (result.length === 0) {
            return res.status(404).json({ message: "No job found with that ID" });
        }
        return res.json(result); // returnerar response med specifikt jobb
    } catch (error) {
        return res.status(404).json({ message: `ID not found. Error-message: ${error}` }); //felmeddelande
    }
})

app.post("/jobs", async (req, res) => {
    try {
        let result = await Job.create(req.body); // query för att lägga till jobb i databas
        return res.status(201).json(result); //returnerar response vid lyckad lagring
    } catch (error) {
        return res.status(400).json(error); // felmeddelande
    }
})

app.put("/jobs/:id", async (req, res) => {
    const query = { _id: req.params.id }; // id för specifikt jobb
    const update = req.body; //uppdatering av jobb
    try {
        let result = await Job.updateOne(query, update, { runValidators: true }); //query för att uppdatera ett specifikt jobb i databas
        return res.json({ message: `Success! Job with ID: ${req.params.id} is now changed.` }); //meddelande vid lyckade uppdatering
    } catch (error) {
        return res.status(400).json({ message: `Error-message: ${error}` }); // felmeddelande
    }
})

app.delete("/jobs/:id", async (req, res) => {
    const query = { _id: req.params.id }; // id för specifikt jobb

    try {
        let result = await Job.deleteOne(query);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No job found with that ID" });
        }
        return res.json({ message: `Success! Job with ID: ${query._id} is now deleted.` });// query för att radera specifikt jobb
    } catch (error) {
        return res.status(400).json({ message: `Error-message: ${error}` }); // felmeddelande
    }
})

//starta server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});