var bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const MODULE_NAME = require('./constants').NAME;

const { parseToDate } = require('../../util/datetimes');

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
      // TODO: make in 1 transaction using includes for create
      const promises = [];
      const timetable = await MODEL.create({
        name: req.body.data.name
      });
      const MODEL_DETAIL = db[MODULE_NAME+"_detail"];
      req.body.data.detail.forEach ( dayDetail => {
        dayDetail.timetableId = timetable.id;
        promises.push(MODEL_DETAIL.create(dayDetail));
      });
      const values = await Promise.all(promises);
      //console.log(values);
      const detail = {};
      values.forEach( val => {
        const day = val.dataValues.day;
        console.log("day: " + day);
        if (!Array.isArray(detail[day])) {
          console.log("creating");
          detail[day] = [];
        }
        detail[day].push({
          open: val.dataValues.open,
          close: val.dataValues.close,
        })
        console.log("details["+day+"]: " + JSON.stringify(detail[day]));
        data = {
          timetableId: timetable.id,
          ...detail
        };
      });
    } catch (e) {
      console.error("E:"+ JSON.stringify(e));
      code = 500;
      data = {
        error: {
          name: e.name,
          detail: e.original.routine ? e.original.routine: '',
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
