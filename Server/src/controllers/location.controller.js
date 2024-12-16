import cloudinary from "../config/cloudinary.js";
import dataUri from "../config/datauri.js";
import sendResponse from "../helper/sendResponse.js";
import { itemModel } from "../models/item.model.js";
import { locationModel } from "../models/location.model.js";

import User from "../models/user.model.js";

export const createLocationController = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    const itemid = req.params.itemid
    console.log(id);
    console.log(itemid);
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 400, "User not found", false);
    }
    const item = await itemModel.findById(itemid)
    if(!item){
      return sendResponse(res,400,"item not found",false)
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
    const result = await locationModel.create({
      name,
      photo: cloudResponse.secure_url,
      patient: user._id,
      item: item._id
    });
    // result.patient = undefined;
    user.locations.push(result);
    await user.save();

    return sendResponse(res, 200, "Created successfully", true, result);
  } catch (error) {
    return sendResponse(res, 400, `error in create item ${error}`, false);
  }
};

export const getAllLocationController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 400, "no user found", false);
    }
    const locations = await locationModel
      .find({ patient: id.toString() })
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, "all locations fetched", true, locations);
  } catch (error) {
    return sendResponse(res, 400, `error in get all item ${error}`, false);
  }
};
