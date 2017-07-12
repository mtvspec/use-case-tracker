/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_project_team_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eOperationID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_operation',
        key: 'id'
      }
    },
    eProjectTeamID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_project_team',
        key: 'id'
      }
    },
    aProjectTeamName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aProjectTeamDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    tableName: 'e_project_team_log'
  });
};
