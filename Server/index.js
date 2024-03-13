const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const domainRouter = require("./Routes/DomainRoute");

const connectDB = require("./Config/db");
const userRouter = require("./Routes/UserRoute");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/api/domains", domainRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
