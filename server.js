const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')
const connectDB = require("./config/database");
const mainRoutes = require('./routes/main')

// Load environment variables
require('dotenv').config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport);

// Connect To Database
connectDB();

// EJS Layouts
app.use(expressLayouts)
app.set('layout', './layouts/main')

// Using EJS for Views
app.set("view engine", "ejs");

// Static Folder
app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(logger('dev'))

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors
app.use(flash());

// Setup Routes
app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
})