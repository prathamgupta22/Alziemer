import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"; // Add JWT import

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["patient", "admin"],
      default: "patient",
    },
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    agency: {
      type: String,
      required: function () {
        return this.role === "caretaker";
      },
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    profile: {
      type: String,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "location" }],
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const User = mongoose.model("User", userSchema);
export default User;
