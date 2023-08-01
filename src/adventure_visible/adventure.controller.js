import Response from "../../utils/index.js";
import AdventureModel from "./adventure.model.js";

const getAdventure = async (req, res, next) => {
  try{
    const Adventure = await AdventureModel.find();

    return res.json(
      Response.success({
        msg: "Adventure Visibility fetched successfully",
        status: 200,
        data: Adventure,
      })
    );
  } catch (err) {
    next(err);
  }
};

const createtAdventure = async (req, res, next) => {
  try {
    let Adventure = await AdventureModel.create({
      pageVisible: req.body.pageVisible,
    });

    return res.json(
      Response.success({
        status: 200,
        msg: "Adventure Visibility updated successfully!",
        data: Adventure,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editAdventure = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newAdventure = await AdventureModel.findById(id);

    let updated = await AdventureModel.findByIdAndUpdate(
      id,
      {
        pageVisible: req.body.pageVisible
      },
      { new: true }
    );

    let updatedAdventure = await updated.save();

    return res.json(
      Response.success({
        msg: "Adventure Visibility updated successfully",
        status: 200,
        data: updatedAdventure,
      })
    )
  } catch (err) {
    next(err);
  }
};

export default {
    getAdventure,
    editAdventure,
    createtAdventure
}
