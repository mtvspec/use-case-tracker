'use strict';

module.exports = (sq, dt) => {

  const Operation = sq
    .define('e_operation', {
      id: {
        type: dt.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      dOperationTypeID: {
        type: dt.BIGINT,
        allowNull: false
      },
      eSessionID: {
        type: dt.BIGINT,
        allowNull: false
      }
    }, {
      schema: 'operations'
    });

  Operation.assiciate = (models) => {
    Operation.belongsTo(models.e_dict_value, { foreignKey: 'dOperationTypeID' });
    Operation.belongsTo(models.e_session, { foreignKey: 'eSessionID' });
  }

  return Operation;

}