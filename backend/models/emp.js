'use strict';

module.exports = (sq, dt) => {
  
  const EmpModel = sq
  .define('e_emp', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    ePersonID: {
      type: dt.BIGINT,
      allowNull: false
    },
    eEmpPositionalUnitID: {
      type: dt.BIGINT,
      allowNull: false
    },
    dEmpStateID: {
      type: dt.BIGINT,
      allowNull: false
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      isIn: [[true, false]] 
    }
  }, {
    schema: 'emp'
  });
  
  EmpModel.associate = (models) => {
    EmpModel.belongsTo(models.e_person, { foreignKey: 'ePersonID' });
    EmpModel.belongsTo(models.e_positional_unit, { foreignKey: 'eEmpPositionalUnitID' });
    EmpModel.belongsTo(models.e_dict_value, { foreignKey: 'dEmpStateID' });
  }
  
  return EmpModel;
  
}