const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

const { mapToDto, BreedDto } = require('../../dtos/dtos');

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Breed } = await connectToDatabase();
    const { pathParameters, body } = extractHttpMetaFromEvent(event);
    const query = {
      include: [
        {
          all: true,
        },
      ],
    };
    let breed = await Breed.findByPk(pathParameters.id || '-1');
    if (!breed) {
      createHTTPError(
        `Sorry, we did not find any breed with id=${pathParameters.id}`,
        404
      );
    }

    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };

    await breed.update(body);
    breed = await Breed.findByPk(breed.id, query);
    response.body.data = mapToDto(breed, BreedDto);
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
