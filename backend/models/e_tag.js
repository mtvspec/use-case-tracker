/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('e_tag', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    a_tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    a_tag_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    d_tag_state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
      tableName: 'e_tag'
    });
};
