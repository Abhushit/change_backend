import Response from "../../utils/index.js";
import NotificationModel from "./notification.model.js";

const getAllNotifications = async (req, res, next) => {
  try {
    const Notifications = await NotificationModel.find()
      .sort({ _id: -1 })
      .populate("tags")
      .populate("groups", "name _id")
      .populate("members", "name _id")
      .exec();

    return res.json(
      Response.success({
        status: 200,
        msg: "Push Notifications fetched successfully!",
        data: Notifications,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    const nots = await NotificationModel.findById(id)
      .populate("tags")
      .populate("groups", "name _id")
      .populate("members", "name _id")
      .exec();
    return res.json(
      Response.success({
        msg: "Push Notification fetched successfully",
        status: 200,
        data: nots,
      })
    );
  } catch (err) {
    next(err);
  }
};

const searchNotification = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const Notification = await NotificationModel.find()
      .or([
        { title: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .populate("tags")
      .populate("groups", "name _id")
      .populate("members", "name _id")
      .exec();

    if (!Notification) {
      return res.json(
        Response.success({
          msg: "No Notification found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched Notification found",
          status: 200,
          data: Notification,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const addNotification = async (req, res, next) => {
  try {
    let newNotification = await NotificationModel.create({
      title: req.body.title,
      text: req.body.text,
      deliveryDate: req.body.deliveryDate,
      status: req.body.status,
      groups: req.body.groups,
      members: req.body.members,
      tags: req.body.tags,
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "Push Notification added successfully!",
        data: newNotification,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notification = await NotificationModel.findById(id);

    let updated = await NotificationModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : notification.title,
        text: req.body.text ? req.body.text : notification.text,
        deliveryDate: req.body.deliveryDate ? req.body.deliveryDate : notification.deliveryDate,
        status: req.body.status ? req.body.status : notification.status,
        groups: req.body.groups ? req.body.groups : notification.groups,
        members: req.body.members ? req.body.members : notification.members,
        tags: req.body.tags ? req.body.tags : notification.tags,
      },
      { new: true }
    );

    let updatedNotification = await updated.save();

    return res.json(
      Response.success({
        msg: "Push Notification updated successfully",
        staus: 200,
        data: updatedNotification,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    let notification = await NotificationModel.findById(id);
    let deleted = await notification.remove();
    return res.json(
      Response.success({
        msg: "Push Notification Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllNotifications,
  getSingleNotification,
  addNotification,
  editNotification,
  deleteNotification,
  searchNotification
};
