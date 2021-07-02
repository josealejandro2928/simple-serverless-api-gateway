module.exports = {
  type: 'object',
  title: 'order',
  description: 'describes properties required to create/update a pets',
  properties: {
    name: {
      type: 'string',
      errorMessage: "'name must be a string value'",
    },
    age: {
      type: 'integer',
      errorMessage: "'age must be an integer value'",
    },
    typeAnimal: {
      type: 'string',
      errorMessage: "'typeAnimal must be an string value'",
    },
    BreedId: {
      type: 'integer',
    },
    weight: {
      type: 'number',
    },
    primaryColor: {
      type: 'string',
    },
    secundaryColor: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
  required: ['name', 'age', 'typeAnimal', 'price'],
  errorMessage: {
    required: {
      name: "'name' is a property required",
      age: "'age' is a property required",
      typeAnimal: "'typeAnimal' is a property required",
      price: "'price' is a property required",
    },
  },
};
