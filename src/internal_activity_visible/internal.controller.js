import InternalModel from "./internal.model.js";
import Response from "../../utils/index.js";

const getInternalActivity = async (req, res, next) => {
  try{
    const Activity = await InternalModel.find();

    return res.json(
      Response.success({
        msg: "Internal Activity Visibility fetched successfully",
        status: 200,
        data: Activity,
      })
    );
  } catch (err) {
    next(err);
  }
};

const createtInternalActivity = async (req, res, next) => {
  try {
    let internal = await InternalModel.create({
      pageVisible: req.body.pageVisible,
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Internal Activity Visibility updated successfully!",
        data: internal,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editInternalActivity = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newEvent = await InternalModel.findById(id);

    let updated = await InternalModel.findByIdAndUpdate(
      id,
      {
        pageVisible: req.body.pageVisible
      },
      { new: true }
    );

    let updatedEvent = await updated.save();

    return res.json(
      Response.success({
        msg: "Internal activity updated successfully",
        status: 200,
        data: updatedEvent,
      })
    )
  } catch (err) {
    next(err);
  }
};

export default {
    getInternalActivity,
    editInternalActivity,
    createtInternalActivity
}
