import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import ShoppingModel from "./shopping.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllShopping = async (req, res, next) => {
  try {
    const Shopping = await ShoppingModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "Shopping fetched successfully",
        status: 200,
        data: Shopping,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleShopping = async (req, res, next) => {
  try {
    const id = req.params.id;
    const shopping = await ShoppingModel.findById(id)
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "Shopping fetched successfully",
        status: 200,
        data: shopping,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchShopping = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Shopping = await ShoppingModel.find()
      .or([
        { title: { $regex: search } },
        { location: { $regex: search } },
        { phone: { $regex: search } },
        { email: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Shopping) {
      return res.json(
        Response.success({
          msg: "No Shopping found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched Shopping found",
          status: 200,
          data: Shopping,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addShopping = async (req, res, next) => {
  try {
    const newImage = req.file;
    const currImage = `${process.env.ROOT_URL}/api/v1/images/${newImage.filename}`;

    const newShopping = await ShoppingModel.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      phone: req.body.phone,
      email: req.body.email,
      openHours: req.body.openHours,
      description: req.body.description,
      enabled: req.body.enabled,
      image: req.file != undefined ? currImage : "",
    });
    return res.json(
      Response.success({
        msg: "Shopping added successfully",
        status: 200,
        data: newShopping,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editShopping = async(req,res,next) => {
    try{
        const id = req.params.id;
        var image, currImage, oldImage;
        const shopping = await ShoppingModel.findById(id);

        if (req.file != undefined) {
          image = req.file;
          currImage = `${process.env.ROOT_URL}/api/v1/images/${image.filename}`;
        }
        oldImage = shopping.image;
        
        let updated = await ShoppingModel.findByIdAndUpdate(id, {
        title: req.body.title ? req.body.title : shopping.title,
        location: req.body.location ? req.body.location : shopping.location,
        phone: req.body.phone ? req.body.phone : shopping.phone,
        price: req.body.price ? req.body.price : shopping.price,
        email: req.body.email ? req.body.email : shopping.email,
        enabled: req.body.enabled ? req.body.enabled : shopping.enabled,
        openHours: req.body.openHours ? req.body.openHours : shopping.openHours,
        description: req.body.description ? req.body.description : shopping.description,
        image: req.file != undefined ? currImage : oldImage,
        },{new: true})

        let updatedShopping = await updated.save();

        if (oldImage) {
          const oldPath = path.join(path.resolve("./"),"images",oldImage.split("/").pop());
          // console.log('old path us>>', oldPath);
          if (fs.existsSync(oldPath)) {
            fs.unlink(oldPath, (err) => {
              if (err) throw err;
            });
          }
        }

        return res.json(
          Response.success({
            msg: "Shopping updated successfully",
            staus: 200,
            data: updatedShopping,
          })
        );

    }catch(err){
        next(err)
    }
}

const deleteShopping = async(req,res,next) => {
  try{
    const id = req.params.id;
    let shopping = await ShoppingModel.findById(id);
    let deleted = await shopping.remove();
    return res.json(
      Response.success({
        msg: "Shopping Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  }catch(err){
    next(err)
  }
}

export default {
  getAllShopping,
  getSingleShopping,
  addShopping,
  editShopping,
  deleteShopping,
  searchShopping
};
