const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
  createHTTPError,
} = require('../../helpers/utils');

const { mapToDto, PetDto } = require('../../dtos/dtos');

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Pet } = await connectToDatabase();
    const { pathParameters, body } = extractHttpMetaFromEvent(event);
    const query = {
      include: [
        {
          all: true,
        },
      ],
    };
    let pet = await Pet.findByPk(pathParameters.id || '-1');
    if (!pet) {
      createHTTPError(
        `Sorry, we did not find any pet with id=${pathParameters.id}`,
        404
      );
    }

    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };

    await pet.update(body);
    pet = await Pet.findByPk(pet.id, query);
    response.body.data = mapToDto(pet, PetDto);
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
