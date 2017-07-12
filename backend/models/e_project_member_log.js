/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_project_member_log', {
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
    eProjectMemberID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_project_member',
        key: 'id'
      }
    },
    eProjectTeamID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_project_team',
        key: 'id'
      }
    },
    ePersonID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_person',
        key: 'id'
      }
    },
    dProjectMemberStateID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
    tableName: 'e_project_member_log'
  });
};
