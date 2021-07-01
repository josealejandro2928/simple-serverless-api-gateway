const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  createHTTPError,
  extractHttpMetaFromEvent,
} = require('../../helpers/utils');

const { mapToDto, BreedDto } = require('../../dtos/dtos');

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Breed } = await connectToDatabase();
    const { body } = extractHttpMetaFromEvent(event);
    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };
    if (!body.name) {
      createHTTPError('Name is required', 400);
    }
    //////DO SOME STUFF//////
    let breed = await Breed.create(body);
    response.body.data = mapToDto(breed, BreedDto);
    ////////////////////////
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
