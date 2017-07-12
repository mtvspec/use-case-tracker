/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('error_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    e_session_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_session',
        key: 'id'
      }
    },
    err_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    err_stack: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'error_log'
  });
};
