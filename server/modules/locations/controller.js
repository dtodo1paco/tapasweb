var bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const MODULE_NAME = require('./constants').NAME;

// Endpoints
module.exports = (api_base, app, db) => {
  const MODEL = db[MODULE_NAME];
  const BASE_PATH = api_base + MODEL.name + '/';

  const ENDPOINTS = {
    findAll: BASE_PATH,
    create: BASE_PATH + 'add',
  }
  console.log("API endpoints: " + JSON.stringify(BASE_PATH));
  app.get(ENDPOINTS.findAll, async (req, res) => {
    let data = [];
    let code = 0;
    try {
      data = await MODEL.findAll({
        where:  {
          enabled: true
        }
      });
    } catch (e) {
      code = 500;
      data = {
        error: {
          name: e.name,
          detail: e.original.routine,
          code: e.original.code,
          hint: e.original.hint,
        },
      };
    }
    res.send({
      code,
      data
    });
  });
  app.post(ENDPOINTS.create, jsonParser, async (req, res) => {
    let data;
    let code = 0;
    try {
      data = await MODEL.create(req.body.data);
    } catch (e) {
      code = 500;
      data = {
        error: {
          name: e.name,
          detail: e.original.routine,
          code: e.original.code,
          hint: e.original.hint,
        },
      };
    }
    res.send({
      code,
      data
    });
  });
};
