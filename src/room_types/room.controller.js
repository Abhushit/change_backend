import Response from "../../utils/index.js";
import RoomModel from "./room.model.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await RoomModel.find()
      .sort({ _id: -1 })
      .populate("tags")
      .exec();
    return res.json(
      Response.success({
        msg: "Room type fetched successfully",
        status: 200,
        data: Rooms,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const room = await RoomModel.findById(id).populate("tags").exec();
    return res.json(
      Response.success({
        msg: "Room type fetched successfully",
        status: 200,
        data: room,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchRoom = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Rooms = await RoomModel.find()
      .or([{ name: { $regex: search } }])
      .sort({ _id: -1 })
      .exec();

    if (!Rooms) {
      return res.json(
        Response.success({
          msg: "No room found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched room found",
          status: 200,
          data: Rooms,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addRoom = async (req, res, next) => {
  try {
    const newImage = req.file ? req.file : "";
    const currImage = `${process.env.ROOT_URL}/api/v1/images/${newImage.filename}`;

    let newRoom = await RoomModel.create({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      image: req.file != undefined ? currImage : "",
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Room type added successfully!",
        data: newRoom,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    var image, currImage, oldImage;
    const room = await RoomModel.findById(id);

    if (req.file != undefined) {
      image = req.file;
      currImage = `${process.env.ROOT_URL}/api/v1/images/${image.filename}`;
    }
    oldImage = room.image;

    let updated = await RoomModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name ? req.body.name : room.name,
        description: req.body.description
          ? req.body.description
          : room.description,
        tags: req.body.tags ? req.body.tags : room.tags,
        image: req.file != undefined ? currImage : oldImage,
      },
      { new: true }
    );

    let updatedRoom = await updated.save();

    if (oldImage) {
      const oldPath = path.join(
        path.resolve("./"),
        "images",
        oldImage.split("/").pop()
      );
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) throw err;
        });
      }
    }

    return res.json(
      Response.success({
        msg: "Room type updated successfully",
        staus: 200,
        data: updatedRoom,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    let room = await RoomModel.findById(id);
    let deleted = await room.remove();
    return res.json(
      Response.success({
        msg: "Room type Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllRooms,
  getSingleRoom,
  addRoom,
  editRoom,
  deleteRoom,
  searchRoom,
};
