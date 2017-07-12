/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_dict_value', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 'nextval(dict.e_dict_value_id_seq::regclass)',
      unique: true
    },
    eDictID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'e_dict',
        key: 'id'
      },
      unique: true
    },
    aDictValueNameEN: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    aDictValueDescEN: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aDictValueNameRU: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    aDictValueDescRU: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: 'now()'
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: 'now()'
    }
  }, {
    schema: 'dict'
  });
};
