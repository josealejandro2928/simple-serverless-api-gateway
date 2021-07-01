const connectToDatabase = require('../../db'); // initialize connection
const {
  errorHandler,
  buildObjectSequelizeQuery,
} = require('../../helpers/utils');

// const { mapToDto, BreedDto } = require('../../dtos/dtos');

module.exports.list = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { Breed } = await connectToDatabase();
    const query = buildObjectSequelizeQuery(event);
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
    allPets = await Breed.findAll(query);
    delete query.offset;
    delete query.limit;
    let total = await Breed.count(query);
    // response.body.data = mapToDto(allPets, BreedDto);
    response.body.data = allPets;
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
