const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  extractHttpMetaFromEvent,
} = require('../../helpers/utils');

////VALIDATOR OF SCHEMA///
const Ajv = require('ajv').default;
const ajv = new Ajv({ allErrors: true });
require('ajv-errors')(ajv);
///////////////////////////

//////SCHEMA AND DTO///////////
const petSchema = require('../../validations/pet-schema');
const { mapToDto, PetDto } = require('../../dtos/dtos');
//////////////////////
module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Pet } = await connectToDatabase();
    const { body } = extractHttpMetaFromEvent(event);
    let response = {
      statusCode: 201,
      body: {
        data: null,
      },
    };
    var valid = ajv.validate(petSchema, body);
    if (!valid) {
      callback(null, errorHandler(ajv.errors, 400, true));
      return;
    }
    //////DO SOME STUFF//////
    let pet = await Pet.create(body);
    response.body.data = mapToDto(pet, PetDto);
    ////////////////////////
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
