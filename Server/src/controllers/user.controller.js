import dataUri from "../config/datauri.js";
import User from "../models/user.model.js";
import moment from "moment";
import cloudinary from "../config/cloudinary.js";
import sendResponse from "../helper/sendResponse.js";
// import PatientHome from './../../../Client/app/Screens/patient/PatientHome';

export const registerController = async (req, res) => {
  try {
    const { role, firstname, lastname, email, password, phone, address, dob } =
      req.body;
    // console.log(role,firstname,lastname,email,password,phone,address,agency)
    if (
      !role ||
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !address ||
      (role === "caretaker" && !agency)
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    console.log(dob);
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).send({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // let formattedDob = null;
    // if (role === "patient" && dob) {
    //   formattedDob = moment(dob, "DD/MM/YYYY").toISOString();
    //   if (!moment(formattedDob).isValid()) {
    //     return res.status(400).send({
    //       success: false,
    //       message: "Invalid date format. Use DD/MM/YYYY.",
    //     });
    //   }
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });
    }

    const profile = req.file;
    if (profile) {
      const fileUri = dataUri(profile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.create({
      role,
      firstname,
      lastname,
      email,
      password,
      phone,
      address,
      dob,
      // profile: cloudResponse.secure_url
    });

    return res.status(200).send({
      success: true,
      message: "Registered Successfully successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error in register API: ${error.message}`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email not found" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });
    }

    const token = user.generateToken();
    user.password = undefined;

    return res
      .status(200)
      .send({ success: true, message: "Login successful", user, token });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error in login API: ${error.message}`,
    });
  }
};

export const getSinglePatientController = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await User.findById(id);
    if (!patient) {
      return sendResponse(res, 400, "Patient not found", false);
    }
    patient.password = undefined;
    return sendResponse(res, 200, "single patient found", true, patient);
  } catch (error) {
    return sendResponse(
      res,
      400,
      `error in getSinglePatientController ${error}`,
      false
    );
  }
};

export const getAllPatientController = async (req, res) => {
  try {
    const patients = await User.findOne({ role: "patient" });
    if (!patients) {
      return sendResponse(res, 400, "No patient found", false);
    }
    return sendResponse(res, 200, "all patients list", true, patients);
  } catch (error) {
    return sendResponse(
      res,
      400,
      `error in getAllPatientController ${error}`,
      false
    );
  }
};
