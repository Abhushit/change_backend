import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import AnnouncementsModel from "./announcements.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllAnnouncements = async (req, res, next) => {
  try {
    const Announcements = await AnnouncementsModel.find()
      .sort({ _id: -1 })
      .populate()
      // .populate("groups", "name _id")
      // .populate("members", "name _id")
      // .populate("tags")
      .exec();
    return res.json(
      Response.success({
        msg: "Announcements fetched successfully",
        status: 200,
        data: Announcements,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleAnnouncement = async (req, res, next) => {
  try {
    const id = req.params.id;
    const announcement = await AnnouncementsModel.findById(id)
      .populate()
      // .populate("groups", "name _id")
      // .populate("members", "name _id")
      // .populate("tags")
      .exec();
    return res.json(
      Response.success({
        msg: "Announcement fetched successfully",
        status: 200,
        data: announcement,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchAnouncement = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Announcements = await AnnouncementsModel.find()
      .or([
        { title: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .populate()
      // .populate("groups", "name _id")
      // .populate("members", "name _id")
      // .populate("tags")
      .exec();

    if (!Announcements) {
      return res.json(
        Response.success({
          msg: "No announcement found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched announcement found",
          status: 200,
          data: Announcements,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addAnnouncement = async (req, res, next) => {
  try {
    const newImage = req.file;
    const currImage = `${process.env.ROOT_URL}/api/v1/images/${newImage.filename}`;
    let newAnnouncement = await AnnouncementsModel.create({
      image: req.file != undefined ? currImage : "",
      title: req.body.title,
      text: req.body.text,
      date: req.body.date,
      // groups: req.body.groups,
      // members: req.body.members,
      // tags: req.body.tags,
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Announcement added successfully!",
        data: newAnnouncement,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editAnnouncement = async (req, res, next) => {
  try {
    const id = req.params.id;
    var image, currImage, oldImage;
    const announcement = await AnnouncementsModel.findById(id);

    if (req.file != undefined) {
      image = req.file;
      currImage = `${process.env.ROOT_URL}/api/v1/images/${image.filename}`;
    }
    oldImage = announcement.image;

    let updated = await AnnouncementsModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : announcement.title,
        text: req.body.text ? req.body.text : announcement.text,
        date: req.body.date ? req.body.date : announcement.date,
        // groups: req.body.groups ? req.body.groups : announcement.groups,
        // members: req.body.members ? req.body.members : announcement.members,
        // tags: req.body.tags ? req.body.tags : announcement.tags,
        image: req.file != undefined ? currImage : oldImage,
      },
      { new: true }
    );
    let updatedAnnouncement = await updated.save();

    if (oldImage) {
      const oldPath = path.join(
        path.resolve("./"),
        "images",
        oldImage.split("/").pop()
      );
      // console.log('old path us>>', oldPath);
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) throw err;
        });
      }
    }

    return res.json(
      Response.success({
        msg: "Announcement updated successfully",
        staus: 200,
        data: updatedAnnouncement,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const id = req.params.id;
    let announcement = await AnnouncementsModel.findById(id);
    let deleted = await announcement.remove();
    return res.json(
      Response.success({
        msg: "Announcement Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllAnnouncements,
  getSingleAnnouncement,
  addAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  searchAnouncement
};
