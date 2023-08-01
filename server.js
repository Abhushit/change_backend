import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//import database
import './db.js';

//rouuting level middlewares
import UserRoutes from './src/users/users.route.js';
import StaffRoutes from './src/staffs/staffs.route.js';
import TagRoutes from './src/tags/tags.route.js';
import GuestRoutes from './src/guest_accounts/guest.route.js';
import GroupRoutes from './src/groups/groups.route.js';
import RoomRoutes from './src/room_types/room.routes.js';
import NotificationRoutes from './src/notification/notification.route.js';
import AnnouncementRoutes from './src/announcements/announcements.route.js';
import SinglePageRoutes from './src/single_pages/single.route.js';
import AdventureRoute from './src/adventure/adventure.route.js';
import ExtraRoute from './src/extra_service/extra.route.js';
import ShoppingRoute from './src/shopping/shopping.route.js';
import RestaurantRoute from './src/restaurants/restaurants.route.js';
import EventRoute from './src/new_event/newEvent.query.js';
import CalendarRoute from './src/calendar_event/calendar.query.js';

import InternalActivityRoute from './src/internal_activity_visible/internal.route.js';
import AdventureVisibleRoute from './src/adventure_visible/adventure.route.js';
import ExtraVisibleRoute from './src/extra_services_visible/extra.route.js';
import RestaurantVisibleRoute from './src/restaurant_visible/restaurant.route.js';
import ShoppingVisibleRoute from './src/shopping_visible/shopping.route.js';



//set port
app.set("PORT", process.env.PORT || 9000);

//third party middlewares
dotenv.config();
app.use(cors());
// app.use(json({ strict: false }));
// app.use(urlencoded());
// app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/images", express.static((__dirname, "images")));


//executing routing level middleware
app.use('/api/v1', UserRoutes);
app.use('/api/v1', StaffRoutes);
// app.use('/api/v1', TagRoutes);
app.use('/api/v1', GuestRoutes);
// app.use('/api/v1', GroupRoutes);
// app.use('/api/v1', RoomRoutes);
// app.use('/api/v1', NotificationRoutes);
app.use('/api/v1', AnnouncementRoutes);
app.use('/api/v1', SinglePageRoutes);
app.use('/api/v1', AdventureRoute);
app.use('/api/v1', ShoppingRoute);
app.use('/api/v1', ExtraRoute);
app.use('/api/v1', RestaurantRoute);
app.use('/api/v1', EventRoute);
app.use('/api/v1', CalendarRoute);

//Page Visible
app.use('/api/v1', InternalActivityRoute);
app.use('/api/v1', AdventureVisibleRoute);
app.use('/api/v1', ExtraVisibleRoute);
app.use('/api/v1', RestaurantVisibleRoute);
app.use('/api/v1', ShoppingVisibleRoute);


//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({
    message: "Not Found",
    status: 404,
  });
});

//error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  //render the error page
  res.status(err.status || 400).json({
    msg: err.message || err,
    staus: err.status,
    success: false,
  });
});

app.listen(app.get("PORT"), function (err, done) {
  if (err) {
    console.log("Server failed to run");
  } else {
    console.log("Server running on port - ", app.get("PORT"));
  }
});
