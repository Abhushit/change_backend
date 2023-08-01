import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import AdventureModel from "./adventure.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllAdventures = async (req, res, next) => {
  try {
    const Adventures = await AdventureModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "Adventure & Day trips fetched successfully",
        status: 200,
        data: Adventures,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleAdventure = async (req, res, next) => {
  try {
    const id = req.params.id;
    const adventure = await AdventureModel.findById(id).populate().exec();
    return res.json(
      Response.success({
        msg: "Adventure & Day trip fetched successfully",
        status: 200,
        data: adventure,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchAdventure = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Adventure = await AdventureModel.find()
      .or([
        { title: { $regex: search } },
        { location: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Adventure) {
      return res.json(
        Response.success({
          msg: "No Adventure found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched Adventure found",
          status: 200,
          data: Adventure,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addAdventure = async (req, res, next) => {
  try {
    console.log('filessss', req.files.image)
    const newImage = req.files.image;
    var currImage = [];
    if(newImage){
      newImage.map(imgs => {
        currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`)
      })
    }

    let newAdventure = await AdventureModel.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      bookable: req.body.bookable,
      enabled: req.body.enabled,
      image: req.files.images ? currImage : "",
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Adventure & day trip added successfully!",
        data: newAdventure,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editAdventure = async (req, res, next) => {
  try {
    console.log('imagess', req.files.image);

    const id = req.params.id;
    var image, oldImage;
    var currImage = [];

    let adventure = await AdventureModel.findById(id);

    if (req.files.image != undefined) {
      image = req.files.image;
      image && image.map(imgs => {
        currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`);
      })
      oldImage = adventure.image;
    }

    let updated = await AdventureModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : adventure.title,
        description: req.body.description ? req.body.description : adventure.description,
        location: req.body.location ? req.body.location : adventure.location,
        price: req.body.price ? req.body.price : adventure.price,
        bookable: req.body.bookable ? req.body.bookable : adventure.bookable,
        enabled: req.body.enabled ? req.body.enabled : adventure.enabled,
        image: req.files.image ? currImage : oldImage,
      },
      { new: true }
    );

    let updatedAdventure = await updated.save();

    if (oldImage) {
      oldImage.map(imgs => {
      const oldPath = path.join(path.resolve("./"),"images",imgs.split("/").pop());
      // console.log('old path us>>', oldPath);
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) throw err;
        });
      }
    })
    }

    return res.json(
      Response.success({
        msg: "Adventure & Day trip updated successfully",
        staus: 200,
        data: updatedAdventure,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteAdventure = async (req, res, next) => {
  try {
    const id = req.params.id;
    let adventure = await AdventureModel.findById(id);
    let deleted = await adventure.remove();
    return res.json(
      Response.success({
        msg: "Adventure & Day trip Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllAdventures,
  getSingleAdventure,
  addAdventure,
  editAdventure,
  deleteAdventure,
  searchAdventure
};
