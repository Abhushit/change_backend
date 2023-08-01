import Response from "../../utils/index.js";
import ShoppingModel from "./shopping.model.js";

const getShopping = async (req, res, next) => {
  try{
    const Shopping = await ShoppingModel.find();

    return res.json(
      Response.success({
        msg: "Shopping Visibility fetched successfully",
        status: 200,
        data: Shopping,
      })
    );
  } catch (err) {
    next(err);
  }
};

const createtShopping = async (req, res, next) => {
  try {
    let Shopping = await ShoppingModel.create({
      pageVisible: req.body.pageVisible,
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Shopping Visibility updated successfully!",
        data: Shopping,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editShopping = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newRes = await ShoppingModel.findById(id);

    let updated = await ShoppingModel.findByIdAndUpdate(
      id,
      {
        pageVisible: req.body.pageVisible
      },
      { new: true }
    );

    let updatedShopping = await updated.save();

    return res.json(
      Response.success({
        msg: "Shopping Visibility updated successfully",
        status: 200,
        data: updatedShopping,
      })
    )
  } catch (err) {
    next(err);
  }
};

export default {
    getShopping,
    editShopping,
    createtShopping
}
