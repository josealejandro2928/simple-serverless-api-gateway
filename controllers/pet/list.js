const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  buildObjectSequelizeQuery,
} = require('../../helpers/utils');

const { mapToDto, PetDto } = require('../../dtos/dtos');

module.exports.list = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Pet, Breed } = await connectToDatabase();
    const query = buildObjectSequelizeQuery(event);
    // console.log(
    //   '🚀 ~ file: list.js ~ line 15 ~ module.exports.list= ~ query',
    //   query
    // );
    // query.logging = console.log;
    query.include = [
      {
        model: Breed,
        as: 'Breed',
      },
    ];
    // query.logging = true;
    let response = {
      statusCode: 200,
      body: {
        data: [],
        meta: {
          count: 0,
          total: 0,
        },
      },
    };
    //////DO SOME STUFF//////
    let allPets = [];
    allPets = await Pet.findAll(query);
    delete query.offset;
    delete query.limit;
    let total = await Pet.count(query);
    response.body.data = mapToDto(allPets, PetDto);
    response.body.meta.count = allPets.length;
    response.body.meta.total = total;
    ////////////////////////
    //////////BEFORE RETURNING CONVERT INTO STRING THE BODY////////
    response.body = JSON.stringify(response.body);
    callback(null, response);
  } catch (error) {
    let response = errorHandler(error, error.status, true);
    callback(null, response);
  }
};
