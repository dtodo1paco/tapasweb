var bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const MODULE_NAME = require('./constants').NAME;
const TIMETABLE_RESTAURANT_MODULE_NAME = require('../0R_tt_r/constants').NAME;
const TIMETABLE_MODULE_NAME = require('../timetable/constants').NAME;
const TIMETABLE_DETAIL_MODULE_NAME = require('../timetable_detail/constants').NAME;

// Endpoints
module.exports = (api_base, app, db) => {
  const MODEL = db[MODULE_NAME];
  const BASE_PATH = api_base + MODEL.name + '/';
  const ENDPOINTS = {
    findAll: BASE_PATH,
    create: BASE_PATH + 'add',
    findById: BASE_PATH + ":id",
    findByIdWithTimetable: BASE_PATH + ":id/timetable",

  }
  console.log("API endpoints: " + JSON.stringify(ENDPOINTS));
  app.get(ENDPOINTS.findAll, async (req, res) => {
    let data = [];
    let code = 0;
    try {
      data = await MODEL.findAll(MODEL.FILTERS.findAll);
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
  app.post(ENDPOINTS.findAll, async (req, res) => {
    let data = [];
    let code = 0;
    try {
      data = await MODEL.findAll(MODEL.FILTERS.findAll);
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

  app.get(ENDPOINTS.findById, async (req, res) => {
    let data = [];
    let code = 0;
    try {
      data = await MODEL.findOne({
        where: {id: req.params.id},
        attributes: ['name', 'address'],
      });
    } catch (e) {
      console.error(e);
      code = 500;
      console.error("E:"+ JSON.stringify(e));
      e.original
        ? data = {
        error: {
          name: e.name,
          detail: e.original.routine,
          code: e.original.code,
          hint: e.original.hint,
        },
      }
        : data = e
    }
    res.send({
      code,
      data
    });
  });
  app.get(ENDPOINTS.findByIdWithTimetable, async (req, res) => {
    let data = [];
    let code = 0;
    try {
      data = await MODEL.findOne({
        where: {id: req.params.id},
        attributes: ['name', 'address'],
        include: [{
            model: db[TIMETABLE_MODULE_NAME],
            as: TIMETABLE_MODULE_NAME,
            attributes: ['name'],
            include: [{
              model: db[TIMETABLE_DETAIL_MODULE_NAME],
              as: TIMETABLE_DETAIL_MODULE_NAME,
              attributes: ['open', 'close', 'day'],
            }]
        }]
      });
    } catch (e) {
      console.error(e);
      code = 500;
      console.error("E:"+ JSON.stringify(e));
      e.original
        ? data = {
          error: {
            name: e.name,
            detail: e.original.routine,
            code: e.original.code,
            hint: e.original.hint,
          },
        }
      : data = e
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
