'use strict';

module.exports = function (sequelize, DataTypes) {

  const User = sequelize
    .define('e_user', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      ePersonID: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(4000),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(20)
      }
    }, {
      schema: 'users'
    });

  User.associate = (models) => {
    User.belongsTo(models.e_person, { foreignKey: 'ePersonID' });
  }

  return User;

};