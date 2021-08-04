require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// app
const app = express();
const cors = require("cors");

const router = express.Router();
const PORT = process.env.PORT || 4000;

// DB connection
mongoose.set ('useCreateIndex', true)
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(() => console.log("Connection with MongoDB was successful"));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');

// routes middleware
app.use("/", router);
app.use("/customeraccount" , authRoutes);
app.use("/customeraccount" , userRoutes);
app.use("/staffaccount" , authRoutes);
app.use("/staffaccount" , staffRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});