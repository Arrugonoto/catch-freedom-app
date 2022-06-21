const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/devices", require("./routes/deviceRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/api/users", (req, res) => {
  res.status(200).json({ message: "Get list of users" });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
