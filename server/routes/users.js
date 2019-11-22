var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users/:
 *   security:
 *     - bearerAuth: []
 *   get:
 *     tags:
 *       - Users
 *     name: get users
 *     summary: blah blah blah
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: ok
 *       '401':
 *         description: unauthorized
 */
router.get('/', function(req, res, next) {
  res.send({"test":"yayyy"});
});

module.exports = router;
