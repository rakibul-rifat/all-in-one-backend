const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

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

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/blogdb");

// Use auth route
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // ✅ this is what enables `/api/auth/login`

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
