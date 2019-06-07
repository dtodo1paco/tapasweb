# TapasWeb

Powered by [![N|Solid](https://dtodo1paco.github.io/cv/build/static/media/favicon.dd4465b0.ico)](https://dtodo1paco.github.io/cv/)

Current status: development

[![N|Solid](https://github.com/dtodo1paco/tapasweb/)]
![status|20190607](https://github.com/dtodo1paco/tapasweb/raw/master/screenshots/20190607.png)

TapasWeb is a web platform born to help people to choose the best tapas and the nice route to get the tapas they are looking for. Some features:

  - Search for Tapas by ingredients (ideal for vegetarians, muslims,...)
  - Search bars by zone (no more long walks looking for a decent bar)
  - Rate tapas and bars
  - ... 

## Please Contribute

  This project is free and we want to see it growing. So if you are able to contribute adding some code, it will be really appreciate by tapasweb community. No matter if your contribution is a simple endpoint, a new search bar or a translations file. It will be helpful.


Here's how:
  - Fork this project in your repository
  - Create a new branch locally and make the platform even better
  - Push your branch to your github repo
  - Create a PR from your branch to development branch of this repo
  - You can contact anytime with @dtodo1paco if you have any doubts

### Tech stack

TapasWeb uses some open source projects to work properly:

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
* [CRA](https://github.com/facebook/create-react-app) - to get started with react
* [Redux](https://redux.js.org/) - to keep code clean
* [React-MD](https://react-md.mlaursen.com/) - to build Material UI components for UI
* [Axios](https://github.com/axios/axios) - to deal with the backend
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [Express-generator](https://expressjs.com/en/starter/generator.html) - to start with express things done
* [SequelizeJS](https://sequelize.readthedocs.io/en/v3/) - to deal with the database
* [PostgreSQL](https://www.postgresql.org/) - or even another SQL db

### Installation

TapasWeb requires to run.
* [Node.js](https://nodejs.org/) v4+ 
* [PostgreSQL](https://www.postgresql.org/) or other SQL engine (configure in db.js)

```sh
$ cd tapasweb
$ cd server && npm install
$ cd client && npm install
```
Set corresponding NODE_ENV variables for each environment
```
DB_{env}_HOST
DB_{env}_DATABASE
DB_{env}_DIALECT
DB_{env}_USERNAME
DB_{env}_PASSWORD
```
Then, build production app
```sh
$ cd client
$ npm run build
```
And run server
```
$ cd server
$ NODE_ENV=production npm start
```
# ToDo list
Please, take a look carefully at the code and do things more or less the same way to keep code clean
- BACKEND - implement /api/v1/search endpoint 
- BACKEND - implement automatic tests with chai and mocha
- BACKEND - implement some init script to load initial data in db
- FRONTEND - improve restaurant card
... please, add some items
