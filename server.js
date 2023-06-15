const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override")
const flash = require("express-flash")
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')
const connectDB = require("./config/database")
// Homeowner Routes
const homeownerMainRoutes = require('./routes/homeowner/main')
const homeownerProjectsRoutes = require('./routes/homeowner/projects')
const homeownerProfileRoutes = require('./routes/homeowner/profile')
// Professional Routes
const proMainRoutes = require('./routes/professional/main')
const proProjectsRoutes = require('./routes/professional/projects')
const proProfileRoutes = require('./routes/professional/profile')
// Connect Routes
const connectRoutes = require('./routes/connect')

// Load environment variables
require('dotenv').config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport);

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

//Override Put / Delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors
app.use(flash());

// Setup Routes
app.use("/", homeownerMainRoutes)
app.use("/projects", homeownerProjectsRoutes)
app.use("/profile", homeownerProfileRoutes)
app.use("/pro", proMainRoutes)
app.use("/pro/projects", proProjectsRoutes)
app.use("/pro/profile", proProfileRoutes)
app.use("/connect", connectRoutes)

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}.`)
    })
})