module.exports = function (sequelize, DataTypes) {
  const Breed = sequelize.define(
    'Breed',
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
      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: 'Type 1',
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      comment: 'A example model.',
      freezeTableName: true,
      tableName: 'Breed',
      hooks: {},
    }
  );
  // eslint-disable-next-line no-unused-vars
  Breed.associate = function (models) {};
  return Breed;
};
