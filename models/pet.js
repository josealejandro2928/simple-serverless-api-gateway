module.exports = function (sequelize, DataTypes) {
  const Pet = sequelize.define(
    'Pet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeAnimal: {
        type: DataTypes.ENUM,
        values: ['dog', 'cat', 'bird', 'mouse', 'horse', 'turtle', 'fish'],
        defaultValue: 'dog',
        allowNull: false,
      },
      BreedId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Breed',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DOUBLE,
      },
      primaryColor: {
        type: DataTypes.STRING,
      },
      secundaryColor: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      comment: 'A example model.',
      freezeTableName: true,
      tableName: 'Pet',
      hooks: {},
    }
  );
  Pet.associate = function (models) {
    models.Pet.belongsTo(models.Breed, {
      as: 'Breed',
    });
  };
  return Pet;
};
