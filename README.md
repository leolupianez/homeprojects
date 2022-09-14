<div align="center">
  <h3 align="center">Home Services</h3>
  <p align="center">
    An app for homeowners to quicky find and connect with home service professionals in their neighborhood.
    <br />
    <br />
    <a href="#">View</a>
    ·
    <a href="https://github.com/joselupianez/home-services-project/issues">Report Bug</a>
    ·
    <a href="https://github.com/joselupianez/home-services-project/pulls">Request Feature</a>
  </p>
</div>

## How It's Made:
Home Services is an app built with the MVC pattern implemented that uses EJS, CSS, NodeJS, Express.JS, MongoDB, and JavaScript. ExpressJS is being used to build the web application and manage the routes. Embedded JavaScript Templates (EJS) are being used to make templates that we can change based on the data being sent from the Controllers before displaying it to the user. Whenever a user creates an account or requests new service, we store that data in a MongoDB database using Model schemas.


## Tech Used:
[![JS][Javascript]][Javascript]
[![ExpressJS][Express.JS]][Express.JS]
[![NodeJS][Node.JS]][Node.JS]

## Installation

```sh
npm install
```
### Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = `2121` (can be any port)
  - DB_STRING = `your database URI`
  - SESSION_SECRET = `random string` (can be any string)

### Run
Start the development server
```sh
npm run dev
```

<!-- MARKDOWN LINKS & IMAGES -->
[Javascript]: https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[Express.JS]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Node.JS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white