const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Breed, Pet } = await connectToDatabase();
    const { pathParameters } = extractHttpMetaFromEvent(event);
    let [breed, pet] = await Promise.all([
      Breed.findByPk(pathParameters.id || '-1'),
      Pet.findOne({
        where: {
          BreedId: pathParameters.id || '-1',
        },
      }),
    ]);
    if (!breed) {
      createHTTPError(
        `Sorry, we did not find any breed with id=${pathParameters.id}`,
        404
      );
    }
    if (pet) {
      createHTTPError(
        `Invalid operation, we cannot delete a breed because there are a pets associate with this instance`,
        404
      );
    }
    let response = {
      statusCode: 204,
      body: {
        data: 'Deleted succefully',
      },
    };
    await breed.destroy();
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
