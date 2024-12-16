import cloudinary from "../config/cloudinary.js";
import dataUri from "../config/datauri.js";
import sendResponse from "../helper/sendResponse.js";
import { itemModel } from "../models/item.model.js";
import User from "../models/user.model.js";

export const createItemController = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 400, "User not found", false);
    }
    if (!name) {
      return sendResponse(res, 400, "Name is required", false);
    }
    const photo = req.file;
    if (!photo) {
      return sendResponse(res, 400, "Please provide the image", false);
    }
    const photoURI = dataUri(photo);
    let cloudResponse = await cloudinary.uploader.upload(photoURI);
    const result = await itemModel.create({
      name,
      photo: cloudResponse.secure_url,
      patient: user._id,
    });
    // result.patient = undefined;
    user.items.push(result);
    await user.save();
    await user.populate({
      path: "items",
      select: "name photo",
    });
    return sendResponse(res, 200, "Created successfully", true, result);
  } catch (error) {
    return sendResponse(res, 400, `error in create item ${error}`, false);
  }
};

export const getAllItemController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 400, "no user found", false);
    }
    const items = await itemModel
      .find({ patient: id.toString() })
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, "all items fetched", true, items);
  } catch (error) {
    return sendResponse(res, 400, `error in get all item ${error}`, false);
  }
};
