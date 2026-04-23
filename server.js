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
mongoose.connect("").then(() => {
    console.log("Conntected to database");
}).catch((error) => {
    console.log("Connection failure" + error);
})

//Routes
app.get("/api", async (req, res) => {

});

//starta server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});