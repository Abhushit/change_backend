import Response from "../../utils/index.js";
import GroupsModel from "./groups.model.js";

const getAllGroups = async (req, res, next) => {
  try {
    const Groups = await GroupsModel.find()
      .sort({ _id: -1 })
      .populate("tags")
      .populate("member","name _id")
      .exec();
    return res.json(
      Response.success({
        msg: "Groups fetched successfully",
        status: 200,
        data: Groups,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    const group = await GroupsModel.findById(id)
      .populate("tags")
      .populate("member","name _id")
      .exec();
    return res.json(
      Response.success({
        msg: "Group fetched successful",
        status: 200,
        data: group,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchGroup = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Groups = await GroupsModel.find()
      .or([
        { name: { $regex: search } },
      ])
      .populate("tags")
      .populate("member","name _id")
      .sort({ _id: -1 })
      .exec();

    if (!Groups) {
      return res.json(
        Response.success({
          msg: "No group found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched group found",
          status: 200,
          data: Groups,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addGroup = async (req, res, next) => {
  try {
    const newGroup = await GroupsModel.create({
      name: req.body.name,
      description: req.body.description,
      member: req.body.member,
      tags: req.body.tags,
    });
    return res.json(
      Response.success({
        msg: "Group added successfully",
        status: 200,
        data: newGroup,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    let group = await GroupsModel.findById(id);

    let updated = await GroupsModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name ? req.body.name : group.name,
        description: req.body.description
          ? req.body.description
          : group.description,
        member: req.body.member ? req.body.member : group.member,
        tags: req.body.tags ? req.body.tags : group.tags,
      },
      { new: true }
    );

    let updatedGroup = await updated.save();

    return res.json(
      Response.success({
        msg: "Group updated successfully",
        status: 200,
        data: updatedGroup,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    let group = await GroupsModel.findById(id);
    let deleted = await group.remove();
    return res.json(
      Response.success({
        msg: "Group deleted successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllGroups,
  getSingleGroup,
  addGroup,
  editGroup,
  deleteGroup,
  searchGroup
};
