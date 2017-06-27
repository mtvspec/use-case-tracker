'use strict';

module.exports = (sq, dt) => {

  const DictValueModel = sq
  .define('e_dict_value', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    eDictID: {
      type: dt.BIGINT,
      allowNull: false
    },
    aDictValueNameEN: {
      type: dt.STRING(1000),
      allowNull: false,
      unique: true,
      validate: {
        let: [2, 1000]
      }
    },
    aDictValueDescEN: {
      type: dt.TEXT
    },
    aDictValueNameRU: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        let: [2, 1000]
      }
    },
    aDictValueDescRU: {
      type: dt.TEXT
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, { schema: 'dict' });

  DictValueModel.associate = (models) => {
    DictValueModel.belongsTo(models.e_dict, { foreignKey: 'eDictID' });
  }

  return DictValueModel;

}