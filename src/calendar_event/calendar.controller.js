import Response from "../../utils/index.js";
import CalendarModel from "./calendar.model.js";

const getAllCalendarEvents = async (req, res, next) => {
  try {
    const CalendarEvent = await CalendarModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "Calendar Events Fetched Successfully",
        status: 200,
        data: CalendarEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleCalendarEvents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const calendarEvent = await CalendarModel.findById(id);
    return res.json(
      Response.success({
        msg: "New Event Fetched!",
        status: 200,
        data: calendarEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const addCalendarEvent = async (req, res, next) => {
  try {
    let calendarEvent = await CalendarModel.create({
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
        msg: "Calendar Event added successfully",
        data: calendarEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editCalendarEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    let calendarEvent = await CalendarModel.findById(id);

    let updated = await CalendarModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title ? req.body.title : calendarEvent.title,
        location: req.body.location ? req.body.location : calendarEvent.location,
        // start: req.body.start ? new Date(Date.parse(req.body.start)) : calendarEvent.start,
        // end: req.body.end ? new Date(Date.parse(req.body.end)) : calendarEvent.end,
        start: req.body.start ? req.body.start : calendarEvent.start,
        end: req.body.end ? req.body.end : calendarEvent.end,
        bookable: req.body.bookable ? req.body.bookable : calendarEvent.bookable,
      },
      { new: true }
    );

    let updatedEvent = await updated.save();

    return res.json(
      Response.success({
        msg: "Calendar Event updated successfully",
        status: 200,
        data: updatedEvent,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteCalendarEvent = async (req, res, next) => {
    try {
      const id = req.params.id;
      let calendarEvent = await CalendarModel.findById(id);
      let deleted = await calendarEvent.remove();
      return res.json(
        Response.success({
          msg: "Calendar Event deleted successfully!",
          status: 200,
          data: deleted,
        })
      );
    } catch (err) {
      next(err);
    }
  };


  export default {
    getAllCalendarEvents,
    getSingleCalendarEvents,
    addCalendarEvent,
    editCalendarEvent,
    deleteCalendarEvent
  }