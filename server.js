const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure default user for auth
const User = require("./models/User");
async function ensureDefaultUser() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      email: "test@example.com",
      password: hashedPassword,
    });
    console.log("Default user created: test@example.com / password123");
  }
}
ensureDefaultUser();

// MongoDB connect (choose one DB name, e.g. 'mern_app')
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Serve uploads folder for blog images
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running ✅");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
