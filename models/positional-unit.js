'use strict';

module.exports = (sq, dt) => {
  
  const PositionalUnitModel = sq
  .define('e_positional_unit', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    eOrganizationalUnitID: {
      type: dt.BIGINT,
      allowNull: false
    },
    ePositionalUnitID: {
      type: dt.BIGINT,
      allowNull: false
    },
    aPositionalUnitName: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        len: [2, 1000]
      }
    },
    aPositionalUnitDesc: {
      type: dt.TEXT
    },
    dPositionalStateID: {
      type: dt.BIGINT,
      allowNull: false
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, {
    schema: 'organizations'
  });
  
  PositionalUnitModel.associate = (models) => {
    PositionalUnitModel.belongsTo(models.e_organizational_unit, { foreignKey: 'eOrganizationalUnitID' });
    PositionalUnitModel.belongsTo(models.e_positional_unit, {foreignKey: 'ePositionalUnitID' });
    PositionalUnitModel.belongsTo(models.e_dict_value, { foreignKey: 'dPositionalUnitID' });
  }
  
  return PositionalUnitModel;
  
}