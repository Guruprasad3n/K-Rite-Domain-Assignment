const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const domainRouter = require("./Routes/DomainRoute");
const path = require("path");
// const ba = require("../K-Rite/dist");

const connectDB = require("./Config/db");
const userRouter = require("./Routes/UserRoute");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../K-Rite/dist");
app.use(express.static(buildpath));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/domains", domainRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
