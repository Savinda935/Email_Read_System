const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config(); // Ensure environment variables are loaded

const app = express();
const PORT = process.env.PORT || 8081; // Default port 8081 if not provided

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Verify MongoDB connection string
if (!process.env.MONGODB_URL) {
    console.error("Error: MONGODB_URL is not defined in .env");
    process.exit(1);
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connection successful!"))
    .catch((err) => console.error("Mongodb connection error:", err));

// Import and use routes

const textRouter = require("./routes/Text_routes");
app.use("/Text", textRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});
