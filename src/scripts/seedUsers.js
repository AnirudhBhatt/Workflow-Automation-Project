// src/scripts/seedUsers.js
// Script to seed sample users for testing

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    // Clear existing users (optional, for fresh start)
    await User.deleteMany();

    // Sample users
    const users = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123", // Will be hashed
        role: "Admin"
      },
      {
        name: "Manager User",
        email: "manager@example.com",
        password: "manager123",
        role: "Manager"
      },
      {
        name: "Employee User",
        email: "employee@example.com",
        password: "employee123",
        role: "Employee"
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ User ${userData.name} created`);
    }

    console.log("🎉 All sample users seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding users: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
