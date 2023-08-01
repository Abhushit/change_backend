import Response from "../../utils/index.js";
import TagsModel from "./tags.model.js";

const getAllTags = async (req, res, next) => {
  try {
    const Tags = await TagsModel.find().sort({ _id: -1 }).populate().exec();
    return res.json(
      Response.success({
        msg: "Tags Fetched Successfully",
        status: 200,
        data: Tags,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleTag = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tag = await TagsModel.findById(id);
    return res.json(
      Response.success({
        msg: "Tag Fetched Successfully",
        status: 200,
        data: tag,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchTags = async (req, res, next) => {
  try {
    console.log("search body", req.body);

    const search = new RegExp(req.body.search, "i");
    const Tags = await TagsModel.find()
      .or([
        { name: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Tags) {
      return res.json(
        Response.success({
          msg: "No Tags found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched tags found",
          status: 200,
          data: Tags,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addTag = async (req, res, next) => {
  try {
    let newTag = await TagsModel.create({
      name: req.body.name,
      color: req.body.color,
    });
    return res.json(
      Response.success({
        msg: "Tag added successfully",
        status: 200,
        data: newTag,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editTag = async (req, res, next) => {
  try {
    const id = req.params.id;
    let tag = await TagsModel.findById(id);

    let updated = await TagsModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name ? req.body.name : tag.name,
        color: req.body.color ? req.body.color : tag.color,
      },
      { new: true }
    );

    let updatedTag = await updated.save();

    return res.json(
      Response.success({
        msg: "Tag updated successfully!",
        status: 200,
        data: updatedTag,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const id = req.params.id;
    let tag = await TagsModel.findById(id);
    let deleted = await tag.remove();
    return res.json(
      Response.success({
        msg: "Tag deleted successfully",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllTags,
  getSingleTag,
  addTag,
  editTag,
  deleteTag,
  searchTags
};
