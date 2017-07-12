/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  
  const StackeholderLog = sequelize
  .define('e_stakeholder', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ePersonID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'e_person',
        key: 'id'
      }
    },
    aStakeholderDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dStakeholderTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    }
  }, {
    tableName: 'e_stakeholder'
  });

  return StackeholderLog;
};
