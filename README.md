<div align="center">
  <h3 align="center">HomeProjects</h3>
  <p align="center">
     An app for homeowners to connect with home service professionals in their neighborhood and get help on their home projects. Homeowners can post projects while remaining anonymous to everyone that is not a part of their connections. 
    <br />
    <br />
    <a href="https://homeprojects.up.railway.app/">View</a>
    ·
    <a href="https://github.com/joselupianez/homeprojects/issues">Report Bug</a>
    ·
    <a href="https://github.com/joselupianez/homeprojects/pulls">Request Feature</a>
  </p>
  <img src="screenshot.png">
</div>

## How It's Made:
HomeProjects is an app built with the MVC pattern implemented that uses EJS, CSS, NodeJS, Express.JS, MongoDB, and JavaScript. ExpressJS is being used to build the web application and manage the routes. Embedded JavaScript Templates (EJS) are being used to make templates that we can change based on the data being sent from the Controllers before displaying it to the user. Whenever a user creates an account or requests new service, we store that data in a MongoDB database using Model schemas.


## Tech Used:
[![JS][Javascript]][Javascript]
[![ExpressJS][Express.JS]][Express.JS]
[![NodeJS][Node.JS]][Node.JS]
[![TailwindCSS][Tailwind.CSS]][Tailwind.CSS]
[![Mongo][MongoDB]][MongoDB]


## Installation

```sh
npm install
```
### Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = `2121` (can be any port)
  - DB_STRING = `your database URI`
  - SESSION_SECRET = `random string` (can be any string)
  - CLOUD_NAME = `cloudinary cloud name`
  - API_KEY = `cloudinary api key`
  - API_SECRET = `cloudinary api secret`

### Run
Start the development server
```sh
npm run dev
```

## Contributing

### Clone the repo

```bash
git clone https://github.com/leolupianez/homeprojects
cd homeprojects
```

### Install needed packages

```bash
npm install
```

### Run the project

```bash
npm run dev
```

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.


<!-- MARKDOWN LINKS & IMAGES -->
[Javascript]: https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[Express.JS]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Node.JS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Tailwind.CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
