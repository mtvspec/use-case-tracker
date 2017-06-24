const Sequelize = require('sequelize');
const $ = require('db/sequelize.js');
const OperationModel = require('./../operations/OperationModel');
const PersonModel = require('./../persons/PersonModel');

$.define('e_person_log', { schema: 'log'}, {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  operationID: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  ePersonID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    referense: {
      model: Person,
      key: 'id'
    }
  },
  aPersonIIN: {
    type: Sequelize.STRING(100)
  },
  aPersonLastName: {
    type: Sequelize.STRING(100)
  },
  aPersonFirstName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  aPersonMiddleName: {
    type: Sequelize.STRING(100)
  },
  aPersonDOB: {
    type: Sequelize.DATE
  },
  dPersonGenderID: {
    type: Sequelize.BIGINT
  }
})