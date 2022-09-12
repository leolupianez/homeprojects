const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')
const mainRoutes = require('./routes/main')

// Load environment variables
require('dotenv').config({ path: "./config/.env" })

// EJS Layouts
app.use(expressLayouts)
app.set('layout', './layouts/main')

//Using EJS for Views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

// Logging
app.use(logger('dev'))


//Setup Routes
app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
})