//paket
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//variabel för express
const app = express();

//variabel för port
const port = process.env.PORT || 5000;

//cross-origin
app.use(cors());

//Parse JSON
app.use(express.json());

//Anslutning databas
mongoose.connect("mongodb://localhost:27017/lab3").then(() => {
    console.log("Conntected to database");
}).catch((error) => {
    console.log("Connection failure" + error);
})

//Schema
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
        match: [/^\d{4}-\d{2}-\d{2}$/, `Not a valid date, format: XXXX-XX-XX`]
    },
    enddate: {
        type: String,
        required: [true, `Enddate is required`],
        match: [/^\d{4}-\d{2}-\d{2}$/, `Not a valid date, format: XXXX-XX-XX`]
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
        let result = await Job.find({}); //Hämta all data'

        //kontroll om databas saknar data
        if (result.length === 0) {
            res.status(404).json({ message: "No jobs found" });
        } else {
            return res.json(result); //returnera resonse med data
        }
    } catch (error) {
        return res.status(500).json(error); // felmeddelande
    }
});

app.get("/jobs/:id", async (req, res) => {

    try {
        let result = await Job.find({ _id: req.params.id });

        return res.json(result);
    } catch (error) {
        return res.status(400).json({ message: `ID not found. Error-message: ${error}` });
    }
})

app.post("/jobs", async (req, res) => {
    try {
        let result = await Job.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

app.put("/jobs/:id", async (req, res) => {
    const query = { _id: req.params.id };
    const update = {
        $set: {
            companyname: req.body.companyname,
            jobtitle: req.body.jobtitle,
            location: req.body.location,
            description: req.body.description,
            startdate: req.body.startdate,
            enddate: req.body.enddate
        }
    };

    try {
        let result = await Job.updateOne(query, update);
        return res.json({ message: `Success! Job with ID: ${req.params.id} is now changed.` });
    } catch (error) {
        return res.status(400).json({ message: `ID not found. Error-message: ${error}` });
    }
})

//starta server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});