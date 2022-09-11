const express = require('express');
const app = express();
const logger = require('morgan');

// Load environment variables
require('dotenv').config({ path: "./config/.env" })

// Logging
app.use(logger('dev'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
})