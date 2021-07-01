const promisify = require('util').promisify;
prepareProcessNodeEnv('dev');
const { healthCheck } = require('../handler');
const { list } = require('../controllers/pet/list');
const remove = require('../controllers/pet/delete').delete;

beforeAll((done) => {
  done();
});

describe('Initial test controllers', () => {
  test('Testing databases', async () => {
    let healthCheckPromise = promisify(healthCheck);
    let response = await healthCheckPromise({}, {});
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body || '{}')).toEqual({
      message: 'Connection successful.',
      models: {},
    });
  });
});

describe('Should work Pets Controllers', () => {
  test('Testing list function', async () => {
    let listPromise = promisify(list);
    let response = await listPromise(
      { queryStringParameters: { limit: 1, offset: 0 } },
      {}
    );
    expect(response.statusCode).toBe(200);
    let body = JSON.parse(response.body || '{}');
    expect(body.data.constructor).toBe(Array);
    expect(body.data.length).toBe(1);
  });

  test('Testing delete a non existing id function', async () => {
    let deletePromise = promisify(remove);
    let response = await deletePromise(
      { pathParameters: { id:"xxxxx" } },
      {}
    );
    expect(response.statusCode).toBe(404);
    let body = JSON.parse(response.body || '{}');
    expect(body.errors.constructor).toBe(Array);
  });
});

function prepareProcessNodeEnv(env) {
  if (env == 'dev') {
    let secrets = require(`../secrets-development.json`);
    process.env.NODE_ENV = secrets.NODE_ENV;
    process.env.DB_NAME = secrets.DB_NAME;
    process.env.DB_USER = secrets.DB_USER;
    process.env.DB_PASSWORD = secrets.DB_PASSWORD;
    process.env.DB_HOST = secrets.DB_HOST;
    process.env.DB_PORT = secrets.DB_PORT;
  }
  if (env == 'production') {
    let secrets = require(`../secrets-production.json`);
    process.env.NODE_ENV = secrets.NODE_ENV;
    process.env.DB_NAME = secrets.DB_NAME;
    process.env.DB_USER = secrets.DB_USER;
    process.env.DB_PASSWORD = secrets.DB_PASSWORD;
    process.env.DB_HOST = secrets.DB_HOST;
    process.env.DB_PORT = secrets.DB_PORT;
  }
}
