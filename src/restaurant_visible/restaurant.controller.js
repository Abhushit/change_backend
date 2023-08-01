import Response from "../../utils/index.js";
import RestaurantModel from "./restaurant.model.js";

const getRestaurant = async (req, res, next) => {
  try{
    const Restaurant = await RestaurantModel.find();

    return res.json(
      Response.success({
        msg: "Restaurant Visibility fetched successfully",
        status: 200,
        data: Restaurant,
      })
    );
  } catch (err) {
    next(err);
  }
};

const createtRestaurant = async (req, res, next) => {
  try {
    let Restaurant = await RestaurantModel.create({
      pageVisible: req.body.pageVisible,
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Restaurant Visibility updated successfully!",
        data: Restaurant,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editRestaurant = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newRes = await RestaurantModel.findById(id);

    let updated = await RestaurantModel.findByIdAndUpdate(
      id,
      {
        pageVisible: req.body.pageVisible
      },
      { new: true }
    );

    let updatedRestaurant = await updated.save();

    return res.json(
      Response.success({
        msg: "Restaurant Visibility updated successfully",
        status: 200,
        data: updatedRestaurant,
      })
    )
  } catch (err) {
    next(err);
  }
};

export default {
    getRestaurant,
    editRestaurant,
    createtRestaurant
}
