
class PetDto {
  constructor({
    id,
    name,
    typeAnimal,
    Breed,
    age,
    weight,
    primaryColor,
    price,
  }) {
    this.id = id;
    this.name = name;
    this.typeAnimal = typeAnimal;
    this.age = age;
    this.weight = weight;
    this.primaryColor = primaryColor;
    this.price = price;
    if (Breed) {
      this.Breed = { name: Breed.name };
    }
  }
  getIntance() {
    return {
      id: this.id,
      name: this.name,
      typeAnimal: this.typeAnimal,
      age: this.age,
      weight: this.weight,
      primaryColor: this.primaryColor,
      price: this.price,
      Breed: this.Breed,
    };
  }
}

class BreedDto {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
  getIntance() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

module.exports.PetDto = PetDto;
module.exports.BreedDto = BreedDto;

module.exports.mapToDto = function (element, dtoModel) {
  if (element.constructor == Array) {
    return element.map((item) => {
      let instanceDto = new dtoModel(item);
      return instanceDto.getIntance();
    });
  } else {
    let instanceDto = new dtoModel(element);
    return instanceDto.getIntance();
  }
};
