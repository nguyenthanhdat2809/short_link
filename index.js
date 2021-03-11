require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.use(express.static('public'));

app.use(express.json({ extented: false }));

// Define Route
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
