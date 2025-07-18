const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Make sure this path is correct

mongoose.connect("mongodb://127.0.0.1:27017/blogdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("✅ User created successfully");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Failed to seed user:", err));
