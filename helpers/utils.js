// simple Error constructor for handling HTTP error codes
/**
 *
 * @param {*} message message of the error
 * @param {*} statusCode  status
 * @returns {*} An Error Object
 */
function createHTTPError(message, statusCode) {
  const error = new Error(message);
  error.status = statusCode;
  throw error;
}

/**
 *
 * @param {*} errors Array or Object of error, this must contains a field message
 * @param {*} status Status of the operation
 * @param {*} logging Allows to log the error on console
 * @returns {*} A object response to lambda function
 */

function errorHandler(errors, status = 500, logging = true) {
  errors = errors.constructor !== Array ? [errors] : errors;
  let response = {
    body: { errors: [] },
    statusCode: status || 500,
  };

  errors.map((error) => {
    const e = { message: error.message, path: error.path };
    if (error.name) {
      e.field = error.name;
    }
    response.body.errors.push(e);
  });
  if (logging) {
    console.error('\x1b[31m', errors);
  }

  response.body = JSON.stringify(response.body);
  return response;
}

/**
 *
 * @param {*} event event data from lambda
 * @returns {*} { body, pathParameters, queryParameters, headers };
 */
function extractHttpMetaFromEvent(event) {
  let body = JSON.parse(event.body || '{}');
  let pathParameters = { ...event.pathParameters };
  let queryParameters = Object.keys(
    (event.multiValueQueryStringParameters || {})
  ).reduce((query, key) => {
    if (event.multiValueQueryStringParameters[key]) {
      let param = event.multiValueQueryStringParameters[key];
      query[key] = param.length && param.length == 1 ? param[0] : param;
      return query;
    } else {
      return query;
    }
  }, {});
  let headers = { ...event.headers };
  return { body, pathParameters, queryParameters, headers };
}
/**
 *
 * @param {*} event event data from lanbda
 * @returns {*} query object for sequelize ORM
 */
function buildObjectSequelizeQuery(event) {
  let { queryParameters } = extractHttpMetaFromEvent(event);
  let query = {};
  if ('limit' in queryParameters) {
    query.limit = parseInt(queryParameters.limit) || 10000000;
  }
  if ('offset' in queryParameters) {
    query.offset = parseInt(queryParameters.offset) || 0;
  }
  query.where = buildWherePartFromQuery(queryParameters);
  query.order = buildOrderPartFromQuery(queryParameters);

  return query;
  //////////////////////////
  //?limit=10&offset=0&param1=test&param2.gte=10&pram3.like=sdsdsd&param4.in=1&param4.in=2
  function buildWherePartFromQuery(query = {}) {
    console.log(query);
    let where = {};
    const { Op } = require('sequelize');
    Object.keys(query).map((key) => {
      if (!['limit', 'offset'].includes(key) && !key.includes('order')) {
        let [param, operator] = key.split('.');
        let value = query[key];
        where[param] = where[param] || {};
        if (!operator) {
          where[param][Op.eq] = value;
        } else {
          if (['in', 'notIn'].includes(operator)) {
            value = value.constructor !== Array ? [value] : value;
            where[param][Op[operator]] = value;
          } else if (['like', 'notLike'].includes(operator)) {
            where[param][Op[operator]] = `%${value}%`;
          } else {
            where[param][Op[operator]] = value;
          }
        }
      }
    });
    return where;
  }
  function buildOrderPartFromQuery(query = {}) {
    const order = [];
    Object.keys(query).map((key) => {
      if (key.includes('order')) {
        let param = key.split('.')[1];
        let value = query[key];
        if (param) {
          order.push([param, value]);
        }
      }
    });
    return order;
  }
}

module.exports = {
  createHTTPError: createHTTPError,
  errorHandler: errorHandler,
  extractHttpMetaFromEvent: extractHttpMetaFromEvent,
  buildObjectSequelizeQuery: buildObjectSequelizeQuery,
};
