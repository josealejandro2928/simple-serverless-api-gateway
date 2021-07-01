const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

const { mapToDto, PetDto } = require('../../dtos/dtos');

module.exports.listOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Pet } = await connectToDatabase();
    const { pathParameters } = extractHttpMetaFromEvent(event);
    const query = {
      include: [
        {
          all: true,
        },
      ],
    };
    let pet = await Pet.findByPk(pathParameters.id || '-1', query);
    if (!pet) {
      createHTTPError(
        `Sorry, we did not find any pet with id=${pathParameters.id}`,
        404
      );
    }
    // query.logging = true;
    let response = {
      statusCode: 200,
      body: {
        data: null,
      },
    };
    response.body.data = mapToDto(pet, PetDto);
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
