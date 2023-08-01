import Response from "../../utils/index.js";
import StaffsModel from "./staffs.model.js";

const getAllStaffs = async (req, res, next) => {
  try {
    const Staffs = await StaffsModel.find().sort({ _id: -1 }).populate().exec();
    return res.json(
      Response.success({
        msg: "Staffs Fetched Successfully",
        status: 200,
        data: Staffs,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchStaff = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Staffs = await StaffsModel.find()
      .or([
        { userName: { $regex: search } },
        { email: { $regex: search } },
        { role: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!Staffs) {
      return res.json(
        Response.success({
          msg: "No staffs found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched staffs found",
          status: 200,
          data: Staffs,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const getSingleStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    const staff = await StaffsModel.findById(id);
    return res.json(
      Response.success({
        msg: "Staff Fetched!",
        status: 200,
        data: staff,
      })
    );
  } catch (err) {
    next(err);
  }
};

const addStaff = async (req, res, next) => {
  try {
    let findEmail = await StaffsModel.findOne({ email: req.body.email });
    if (findEmail) {
      return res.json(
        Response.fail({ msg: "Email already exists!", status: 401 })
      );
    } else {
      let newStaff = await StaffsModel.create({
        userName: req.body.userName,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        role: req.body.role,
      });
      return res.json(
        Response.success({
          status: 200,
          msg: "Staff added successfully",
          data: newStaff,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const editStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    let staff = await StaffsModel.findById(id);

    let updated = await StaffsModel.findByIdAndUpdate(
      id,
      {
        userName: req.body.userName ? req.body.userName : staff.userName,
        email: req.body.email ? req.body.email : staff.email,
        jobTitle: req.body.jobTitle ? req.body.jobTitle : staff.jobTitle,
        role: req.body.role ? req.body.role : staff.role,
      },
      { new: true }
    );

    let updatedStaff = await updated.save();

    return res.json(
      Response.success({
        msg: "Staff updated successfully!",
        status: 200,
        data: updatedStaff,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    let staff = await StaffsModel.findById(id);
    let deleted = await staff.remove();
    return res.json(
      Response.success({
        msg: "Staff deleted successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllStaffs,
  getSingleStaff,
  addStaff,
  editStaff,
  deleteStaff,
  searchStaff,
};
