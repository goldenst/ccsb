const express = require("express");
const connectDb = require("./config/db");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();

connectDb();

app.use(express.json({ extended: false }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));

// Serve static for production
if (process.env.NODE_ENV === "production") {
  // set staic folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
  
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
