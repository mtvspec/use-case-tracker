/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('r_e_tag_e_issue', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    e_tag_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_tag',
        key: 'id'
      }
    },
    e_issue_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_issue',
        key: 'id'
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'r_e_tag_e_issue'
  });
};
