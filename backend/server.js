const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000;
const dotenv=require('dotenv').config()
const colors = require("colors");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const cors=require('cors')
__dirname = path.resolve();

connectDB();
app.use(cors({origin:'*'}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });