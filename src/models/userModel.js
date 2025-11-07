import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Manager", "Employee"], default: "Employee" }
});

/* Hash password before save
This is called a Mongoose pre-save hook — it runs right before a user is saved to the database.
Step-by-step:
It checks if the password field has been modified.
If it hasn’t, it just moves on (next()).
If it has, it hashes the password using bcrypt before saving.
bcrypt.hash(this.password, 10) → encrypts the password with 10 rounds of salting (a security layer).
This means even you (the developer) can’t see users’ real passwords in the database.*/

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Custom Method(matchPassword) to compare entered password with hashed password in DB
export default mongoose.model("User", userSchema);
