import UsersModel from "./users.model.js";
import Response from "../../utils/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { basename, dirname, join } from "path";
import express from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

function createToken(data) {
  return jwt.sign(
    {
      _id: data._id,
    },
    process.env.JWT_SECRET
  );
}

const login = async (req, res, next) => {
  try {
    const user = await UsersModel.findOne({ 
      $or: [{ userName: req.body.userName }, { email: req.body.email }],
      // email: req.body.email 
    })
      .sort({ _id: -1 })
      .populate()
      .exec();
    if (user) {
      let isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordMatch) {
        let token = createToken(user);
        let currUser = {
          userName: user.userName,
          email: user.email,
          jobTitle: user.jobTitle,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          // image: user.image ? user.image : "",
          _id: user._id,
        }
        res.json(
          Response.success({
            status: 200,
            msg: "User successfully logged in",
            data: currUser,
            token: token,
          })
        );
      } else {
        res.json(Response.fail({ msg: "Invalid Password", status: 401 }));
      }
    } else {
      res.json(Response.fail({ msg: "Email does not exist!", status: 401 }));
    }
  } catch (err) {
    next(err);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const search = new RegExp(req.body.search, "i");
    const User = await UsersModel.find()
      .or([
        { userName: { $regex: search } },
        { email: { $regex: search } },
        { role: { $regex: search } },
      ])
      .sort({ _id: -1 })
      .exec();

    if (!User) {
      return res.json(
        Response.success({
          msg: "No Staff users found",
          status: 400,
          data: [],
        })
      );
    } else {
      return res.json(
        Response.success({
          msg: "Searched staff users found",
          status: 200,
          data: User,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const Users = await UsersModel.find()
      .sort({
        _id: -1,
      })
      .populate()
      .exec();
    return res.json(
      Response.success({
        status: 200,
        data: Users,
        msg: "Staffs users Fetched Successfully!",
      })
    );
  } catch (err) {
    return res.json(
      Response.fail({
        msg: err.message,
        status: 401,
      })
    );
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UsersModel.findById(id);
    return res.json(
      Response.success({
        status: 200,
        data: user,
        msg: "Staff user Fetched!",
      })
    );
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    // console.log("body", req.body);
    // console.log("file", req.file);
    let findUsername = await UsersModel.findOne({ userName: req.body.userName });
    if (findUsername) {
      return res.json(
        Response.fail({ msg: "Username already exists", status: 401 })
      );
    } else {
      // if (req.file != undefined) {
      //   const image = req.file ? req.file : "";
      //   const currImage = `${process.env.ROOT_URL}/api/v1/images/${image.filename}`;
      // }

      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      let newUser = await UsersModel.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        jobTitle: req.body.jobTitle,
        role: req.body.role,
        // image: req.file != undefined ? currImage : "",
        // createdAt: req.body.createdAt,
        // updatedAt: req.body.updatedAt,
      });
      return res.json(
        Response.success({
          status: 200,
          msg: "Staff user added successfully!",
          data: newUser,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // var image, currImage, oldImage;

    let users = await UsersModel.findById(id);

    // if (req.file != undefined) {
    //   image = req.file;
    //   currImage = `${process.env.ROOT_URL}/api/v1/images/${image.filename}`;
    // }
    // oldImage = users.image;

    let updated = await UsersModel.findByIdAndUpdate(
      id,
      {
        userName: req.body.userName ? req.body.userName : users.userName,
        email: req.body.email ? req.body.email : users.email,
        // password: hashedPassword,
        jobTitle: req.body.jobTitle ? req.body.jobTitle : users.jobTitle,
        role: req.body.role ? req.body.role : users.role,
        // role: req.body.role,
        // image: req.file != undefined ? currImage : oldImage,
      },
      { new: true }
    );

    let updatedUser = await updated.save();

    // if (oldImage) {
    //   const oldPath = path.join(
    //     path.resolve("./"),
    //     "images",
    //     oldImage.split("/").pop()
    //   );
    //   // console.log('old path us>>', oldPath);
    //   if (fs.existsSync(oldPath)) {
    //     fs.unlink(oldPath, (err) => {
    //       if (err) throw err;
    //     });
    //   }
    // }

    return res.json(
      Response.success({
        msg: "Staff user updated successfully",
        staus: 200,
        data: updatedUser,
      })
    );
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    let user = await UsersModel.findById(id);
    let deleted = await user.remove();
    return res.json(
      Response.success({
        msg: "Staff User Deleted Successfully!",
        status: 200,
        data: deleted,
      })
    );
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  getAllUsers,
  postUser,
  updateUser,
  getSingleUser,
  deleteUser,
  searchUser
};
