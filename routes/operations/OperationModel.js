const Sequelize = require('sequelize');
const $ = require('db/sequelize.js');

const SessionModel = require('./../sessions/SessionModel.js');

$.define('e_operation', { schema: 'operations' }, {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  sessionID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    referense: {
      model: SessionModel,
      key: 'id'
    }
  }
});