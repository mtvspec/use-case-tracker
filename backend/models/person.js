'use strict';

module.exports = function (sequelize, DataTypes) {

  const Person = sequelize
    .define('e_person', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      aPersonIIN: {
        type: DataTypes.STRING(100)
      },
      aPersonLastName: {
        type: DataTypes.STRING(100)
      },
      aPersonFirstName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      aPersonMiddleName: {
        type: DataTypes.STRING(100)
      },
      aPersonDOB: {
        type: DataTypes.DATE
      },
      dPersonGenderID: {
        type: DataTypes.BIGINT
      }
    }, {
      schema: 'persons'
    });

  return Person;

}