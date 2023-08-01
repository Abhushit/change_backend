import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import SingleModel from "./single.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllSinglePages = async (req, res, next) => {
  try {
    const SinglePages = await SingleModel.find()
      .sort({ _id: -1 })
      .populate()
      // .populate("tags")
      // .populate("members", "name _id")
      // .populate("groups", "name _id")
      .exec();
    return res.json(
      Response.success({
        msg: "All Single Pages fetched successfully",
        status: 200,
        data: SinglePages,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSinglePage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const single = await SingleModel.findById(id)
        .populate()
      // .populate("tags")
      // .populate("members", "name _id")
      // .populate("groups", "name _id")
      .exec();
    return res.json(
      Response.success({
        msg: "Single Page fetched successfully",
        status: 200,
        data: single,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchSingle = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const SinglePage = await SingleModel.find()
      .or([
        { title: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .populate()
      // .populate("tags")
      // .populate("members", "name _id")
      // .populate("groups", "name _id")
      .exec();

    if (!SinglePage) {
      return res.json(
        Response.success({
          msg: "No SinglePage found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched SinglePage found",
          status: 200,
          data: SinglePage,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addSinglePage = async (req, res, next) => {
  // console.log("body", req.body);
  // console.log("file", req.files.image);
  try {
    var newImage = "";
    var newIcon = "";
    if (req.files) {
      newImage = req.files.image ? req.files.image : "";
      newIcon = req.files.icon ? req.files.icon[0] : "";
    }
    var currImage = [];
    newImage && newImage.map(imgs => {
      currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`)
    })
    const currIcon = `${process.env.ROOT_URL}/api/v1/images/${newIcon.filename}`;

    let newSingle = await SingleModel.create({
      title: req.body.title,
      description: req.body.description,
      enabled: req.body.enabled,
      pageVisible: req.body.pageVisible,
      // groups: req.body.groups,
      // members: req.body.members,
      // tags: req.body.tags,
      image: req.files.image ? currImage : "",
      icon: req.files.icon ? currIcon : "",
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Single Page added successfully!",
        data: newSingle,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editSinglePage = async (req, res, next) => {
  try {
    console.log('image',req.files)
    const id = req.params.id;
    var image, icon, currIcon, oldImage, oldIcon;
    var currImage = [];
    const single = await SingleModel.findById(id);

    if(req.files.image){
        image = req.files.image ? req.files.image : "";
        image && image.map(imgs => {
          currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`)
        })
    }
    if(req.files.icon){
        icon = req.files.icon ? req.files.icon[0] : "";
        currIcon = `${process.env.ROOT_URL}/api/v1/images/${icon.filename}`;
    }
    oldImage = single.image;
    oldIcon = single.icon;

    let updated = await SingleModel.findByIdAndUpdate(id, {
        title : req.body.title ? req.body.title : single.title,
        description : req.body.description ? req.body.description : single.description,
        enabled : req.body.enabled ? req.body.enabled : single.enabled,
        pageVisible : req.body.pageVisible ? req.body.pageVisible : single.pageVisible,
        // groups : req.body.groups ? req.body.groups : single.groups,
        // members : req.body.members ? req.body.members : single.members,
        // tags : req.body.tags ? req.body.tags : single.tags,
        image : req.files.image ? currImage : oldImage,
        icon : req.files.icon ? currIcon : oldIcon,
    },{new:true})

    let updatedSinglePage = await updated.save();

    if (req.files.image) {
        oldImage.map(imgs => {
        const oldPath = path.join(path.resolve("./"),"images",imgs.split("/").pop());
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) throw err;
          })
        }
      })
    }

    if (req.files.icon) {
        const oldIconPath = path.join(path.resolve("./"),"images",oldIcon.split("/").pop());
        if (fs.existsSync(oldIconPath)) {
          fs.unlink(oldIconPath, (err) => {
            if (err) throw err;
          });
        }
    }

    return res.json(
        Response.success({
          msg: "Single Page updated successfully",
          staus: 200,
          data: updatedSinglePage,
        })
      );
  } catch (err) {
    next(err);
  }
};

const deleteSinglePage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const single = await SingleModel.findById(id);
    let deleted = await single.remove();
    return res.json(
      Response.success({
        msg: "Single Page Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllSinglePages,
  getSinglePage,
  addSinglePage,
  editSinglePage,
  deleteSinglePage,
  searchSingle
};
