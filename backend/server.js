const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Mongoose is required to establish connection with Atlas database

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// Connection to ATLAS database:
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Required files for routing
const shiftsRouter = require("./routes/shifts");
const usersRouter = require("./routes/users");
// Routing implementation
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
