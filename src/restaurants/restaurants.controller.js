import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import RestaurantsModel from "./restaurants.model.js";
import Response from "../../utils/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllRestaurants = async (req, res, next) => {
  try {
    const Restaurants = await RestaurantsModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();

    return res.json(
      Response.success({
        msg: "Restaurants fetched successfully",
        status: 200,
        data: Restaurants,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleRestaurant = async (req, res, next) => {
  try {
    const id = req.params.id;
    const restaurant = await RestaurantsModel.findById(id).populate().exec();
    return res.json(
      Response.success({
        msg: "Restaurant fetched successfully",
        status: 200,
        data: restaurant,
      })
    );
  } catch (err) {
    next(err);
  }
};

const addRestaurant = async (req, res, next) => {
  try {
    const newImage = req.files.image;
    console.log('new imgs', newImage)
    var currImage = [];
    if(newImage !== undefined){
      newImage && newImage.map(imgs => {
        currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`);
      })
    }

    let newRestaurant = await RestaurantsModel.create({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      openHours: req.body.openHours,
      priceRange: req.body.priceRange,
      bookable: req.body.bookable,
      enabled: req.body.enabled,
      image: req.files.image !== undefined ? currImage : "",
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Restaurant added successfully!",
        data: newRestaurant,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchRestaurant = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Restaurant = await RestaurantsModel.find()
      .or([
        { title: { $regex: search } },
        { location: { $regex: search } },
        { email: { $regex: search } },
        { phone: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Restaurant) {
      return res.json(
        Response.success({
          msg: "No Restaurant found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched Restaurant found",
          status: 200,
          data: Restaurant,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const editRestaurant = async (req, res, next) => {
  try {
    const id = req.params.id;
    var image, oldImage;
    var currImage = [];
    const restaurant = await RestaurantsModel.findById(id);

    console.log('imsss', req.files.image);
    
    if (req.files.image !== undefined) {
      image = req.files.image;
      image && image.map(imgs => {
        currImage.push(`${process.env.ROOT_URL}/api/v1/images/${imgs.filename}`);
      })
      oldImage = restaurant.image;
    }

    let updated = await RestaurantsModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : restaurant.title,
        shortDescription: req.body.shortDescription
          ? req.body.shortDescription
          : restaurant.shortDescription,
        location: req.body.location ? req.body.location : restaurant.location,
        phone: req.body.phone ? req.body.phone : restaurant.phone,
        email: req.body.email ? req.body.email : restaurant.email,
        openHours: req.body.openHours
          ? req.body.openHours
          : restaurant.openHours,
        priceRange: req.body.priceRange
          ? req.body.priceRange
          : restaurant.priceRange,
        bookable: req.body.bookable ? req.body.bookable : restaurant.bookable,
        enabled: req.body.enabled ? req.body.enabled : restaurant.enabled,
        image: req.files.image !== undefined ? currImage : oldImage,
      },
      { new: true }
    );

    let updatedRestaurant = await updated.save();

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
        msg: "Restaurant updated successfully",
        staus: 200,
        data: updatedRestaurant,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteRestaurant = async(req,res,next) => {
    try{
        const id = req.params.id;
        let restaurant = await RestaurantsModel.findById(id);
        let deleted = await restaurant.remove();
        return res.json(
            Response.success({
              msg: "Restaurant Deleted Successfully!",
              status: 200,
              data: deleted,
            })
        );
    }catch(err){
        next(err)
    }
}

export default {
  getAllRestaurants,
  getSingleRestaurant,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  searchRestaurant
};
