/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_dict', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 'nextval(dict.e_dict_id_seq::regclass)',
      unique: true
    },
    aDictNameEN: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    aDictDescEN: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aDictNameRU: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    aDictDescRU: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    aDictSystemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'e_dict'
  });
};
