import Response from "../../utils/index.js";
import ExtraModel from "./extra.model.js";

const getExtraServices = async (req, res, next) => {
  try{
    const Extra = await ExtraModel.find();

    return res.json(
      Response.success({
        msg: "Extra Service Visibility fetched successfully",
        status: 200,
        data: Extra,
      })
    );
  } catch (err) {
    next(err);
  }
};

const createtExtraServices = async (req, res, next) => {
  try {
    let Extra = await ExtraModel.create({
      pageVisible: req.body.pageVisible,
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Extra Services Visibility updated successfully!",
        data: Extra,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editExtraServices = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newExtra = await ExtraModel.findById(id);

    let updated = await ExtraModel.findByIdAndUpdate(
      id,
      {
        pageVisible: req.body.pageVisible
      },
      { new: true }
    );

    let updatedExtra = await updated.save();

    return res.json(
      Response.success({
        msg: "Extra Services Visibility updated successfully",
        status: 200,
        data: updatedExtra,
      })
    )
  } catch (err) {
    next(err);
  }
};

export default {
    getExtraServices,
    editExtraServices,
    createtExtraServices
}
