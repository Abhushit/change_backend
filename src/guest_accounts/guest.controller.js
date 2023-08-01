import Response from "../../utils/index.js";
import GuestModel from "./guest.model.js";

const getAllGuests = async (req, res, next) => {
  try {
    const Guests = await GuestModel.find()
      .sort({ _id: -1 })
      .populate()
      .exec();
    return res.json(
      Response.success({
        msg: "Guest accounts fetched successfully",
        status: 200,
        data: Guests,
      })
    );
  } catch (err) {
    next(err);
  }
};

const getSingleGuest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const guest = await GuestModel.findById(id).populate().exec();
    return res.json(
      Response.success({
        msg: "Guest fetched successfully",
        status: 200,
        data: guest,
      })
    );
  } catch (err) {
    next(err);
  }
};

const addGuest = async (req, res, next) => {
  try {
    let newGuest = await GuestModel.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      checkinDate: req.body.checkinDate,
      checkoutDate: req.body.checkoutDate,
      stayDays: req.body.stayDays,
      // room: req.body.room,
      // status: req.body.status,
      account: req.body.account,
      // tags: req.body.tags,
    });
    return res.json(
      Response.success({
        msg: "Guest Account Added Successfully!",
        status: 200,
        data: newGuest,
      })
    );
  } catch (err) {
    next(err);
  }
};

const editGuest = async (req, res, next) => {
  try {
    const id = req.params.id;
    let guest = await GuestModel.findById(id);

    let updated = await GuestModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name ? req.body.name : guest.name,
        email: req.body.email ? req.body.email : guest.email,
        phone: req.body.phone ? req.body.phone : guest.phone,
        checkinDate: req.body.checkinDate ? req.body.checkinDate : guest.checkinDate,
        checkoutDate: req.body.checkoutDate ? req.body.checkoutDate : guest.checkoutDate,
        stayDays: req.body.stayDays ? req.body.stayDays : guest.stay,
        // room: req.body.room ? req.body.room : guest.room,
        // status: req.body.status ? req.body.status : guest.status,
        account: req.body.account ? req.body.account : guest.account,
        // tags: req.body.tags ? req.body.tags : guest.tags,
      },
      { new: true }
    );

    let updatedGuest = await updated.save();

    return res.json(
      Response.success({
        msg: "Guest Account updated successfully!",
        status: 200,
        data: updatedGuest,
      })
    );
  } catch (err) {
    next(err);
  }
};

const forceExpire = async(req,res,next) => {
  try{
    const id = req.params.id;
    let guest = await GuestModel.findById(id);
    let updated = await GuestModel.findByIdAndUpdate(id,{
      ...guest,
      account: req.body.account
    },{new: true});
    let updatedGuest = await updated.save();

    return res.json(
      Response.success({
        msg:"Guest account status changed successfully",
        status: 200,
        data: updatedGuest,
      })
    )
  }catch(err){
    next(err);
  }
}

const deleteGuest = async(req, res, next) => {
  try{
    const id = req.params.id;
    let guest = await GuestModel.findById(id);
    const deleted = await guest.remove();
    return res.json(
      Response.success({
        msg: "Guest Account deleted successfully!",
        status: 200,
        data: deleted,
      })
    );
  }catch(err){
    next(err)
  }
}

export default {
  getAllGuests,
  getSingleGuest,
  addGuest,
  editGuest,
  deleteGuest,
  forceExpire
};
