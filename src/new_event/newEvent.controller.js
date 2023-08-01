import Response from "../../utils/index.js";
import NewEventModel from "./newEvent.model.js";

const getAllNewEvents = async (req, res, next) => {
  try {
    const NewEvent = await NewEventModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "New Events Fetched Successfully",
        status: 200,
        data: NewEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleNewEvents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newEvent = await NewEventModel.findById(id);
    return res.json(
      Response.success({
        msg: "New Event Fetched!",
        status: 200,
        data: newEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const addNewEvent = async (req, res, next) => {
  try {
    let newEvent = await NewEventModel.create({
      title: req.body.title,
      location: req.body.location,
      // start: new Date(Date.parse(req.body.start)),
      // end: new Date(Date.parse(req.body.end)),
      start: req.body.start,
      end: req.body.end,
      bookable: req.body.bookable,
    });
    return res.json(
      Response.success({
        status: 200,
        msg: "New Event added successfully",
        data: newEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editNewEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newEvent = await NewEventModel.findById(id);

    let updated = await NewEventModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : newEvent.title,
        location: req.body.location ? req.body.location : newEvent.location,
        start: req.body.start ? req.body.start : newEvent.start,
        end: req.body.end ? req.body.end : newEvent.end,
        // start: req.body.start ? new Date(Date.parse(req.body.start)) : newEvent.start,
        // end: req.body.end ? new Date(Date.parse(req.body.end)) : newEvent.end,
        bookable: req.body.bookable ? req.body.bookable : newEvent.bookable,
      },
      { new: true }
    );

    let updatedEvent = await updated.save();

    return res.json(
      Response.success({
        msg: "New Event updated successfully",
        status: 200,
        data: updatedEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteNewEvent = async (req, res, next) => {
    try {
      const id = req.params.id;
      let newEvent = await NewEventModel.findById(id);
      let deleted = await newEvent.remove();
      return res.json(
        Response.success({
          msg: "New Event deleted successfully!",
          status: 200,
          data: deleted,
        })
      );
    } catch (err) {
      next(err);
    }
  };


  export default {
    getAllNewEvents,
    getSingleNewEvents,
    addNewEvent,
    editNewEvent,
    deleteNewEvent
  }