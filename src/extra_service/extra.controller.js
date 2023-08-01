import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import ExtraModel from "./extra.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllExtraServices = async (req, res, next) => {
  try {
    const Extras = await ExtraModel.find().sort({ _id: -1 }).populate().exec();
    return res.json(
      Response.success({
        msg: "Extra Services fetched successfully",
        status: 200,
        data: Extras,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleExtraService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const extra = await ExtraModel.findById(id).populate().exec();
    return res.json(
      Response.success({
        msg: "Extra Service fetched successfully",
        status: 200,
        data: extra,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchExtraService = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Extras = await ExtraModel.find()
      .or([
        { title: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Extras) {
      return res.json(
        Response.success({
          msg: "No Extra Service found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched Extra Service found",
          status: 200,
          data: Extras,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addExtraService = async (req, res, next) => {
  try {
    const newImage = req.files.image;
    var currImage = [];
    if(newImage !== undefined){
      console.log('imssaa', newImage)
      newImage && newImage.map(imgs => {
        currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`);
      })
    }

    let newService = await ExtraModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      bookable: req.body.bookable,
      enabled: req.body.enabled,
      image: req.files.image != undefined ? currImage : "",
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Extra Service added successfully!",
        data: newService,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editExtraService = async(req,res,next) => {
    try{
        const id = req.params.id;
        var image, oldImage;
        var currImage = [];
        const extra = await ExtraModel.findById(id);

        if (req.files.image != undefined) {
            image = req.files.image;
            image && image.map(imgs => {
              currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`);
            })
            oldImage = extra.image;
        }

        let updated = await ExtraModel.findByIdAndUpdate(id, {
            title: req.body.title ? req.body.title : extra.title,
            description: req.body.description ? req.body.description : extra.description,
            price: req.body.price ? req.body.price : extra.price,
            bookable: req.body.bookable ? req.body.bookable : extra.bookable,
            enabled: req.body.enabled ? req.body.enabled : extra.enabled,
            image: req.files.image !== undefined ? currImage : oldImage,

        },{new: true})

        let updatedService = await updated.save();

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
              msg: "Extra Service updated successfully",
              staus: 200,
              data: updatedService,
            })
          );
    }catch(err){
        next(err)
    }
}

const deletedExtraService = async(req,res,next) => {
    try{
        const id = req.params.id;
        const service = await ExtraModel.findById(id);
        let deleted = await service.remove();
        return res.json(
            Response.success({
              msg: "Extra Service Deleted Successfully!",
              status: 200,
              data: deleted,
            })
        );
    }catch(err){
        next(err)
    }
}

export default {
  getAllExtraServices,
  getSingleExtraService,
  addExtraService,
  editExtraService,
  deletedExtraService,
  searchExtraService
};
