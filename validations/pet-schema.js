module.exports = {
  type: 'object',
  title: 'order',
  description: 'describes properties required to create/update a pets',
  properties: {
    name: {
      type: 'string',
      title: 'Name is required to create a new Pet',
    },
    age: {
      type: 'integer',
      title: 'Age is required to create a new Pet',
    },
    typeAnimal: {
      type: 'string',
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
};
