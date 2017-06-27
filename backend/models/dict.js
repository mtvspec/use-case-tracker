'use strict';

module.exports = (sq, dt) => {

  const DictModel = sq
  .define('e_dict', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    aDictNameEN: {
      type: dt.STRING(1000),
      allowNull: false,
      unique: true,
      validate: {
        let: [2, 1000]
      }
    },
    aDictDescEN: {
      type: dt.TEXT
    },
    aDictNameRU: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        let: [2, 1000]
      }
    },
    aDictDescRU: {
      type: dt.TEXT
    },
    aDictSystemName: {
      type: dt.STRING(1000),
      allowNull: false,
      unique: true,
      validate: {
        let: [2, 1000]
      }
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

  return DictModel;

}