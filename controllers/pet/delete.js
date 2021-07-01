const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Pet } = await connectToDatabase();
    const { pathParameters } = extractHttpMetaFromEvent(event);
    let pet = await Pet.findByPk(pathParameters.id || '-1');
    if (!pet) {
      createHTTPError(
        `Sorry, we did not find any pet with id=${pathParameters.id}`,
        404
      );
    }
    let response = {
      statusCode: 204,
      body: {
        data: 'Deleted succefully',
      },
    };
    await pet.destroy();
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
