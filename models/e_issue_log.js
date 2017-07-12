/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_issue_log', {
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
    eIssueID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_issue',
        key: 'id'
      }
    },
    eIssueAuthorID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_project_member',
        key: 'id'
      }
    },
    dIssueTypeID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    aIssueName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aIssueDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dIssueStateID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
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
    tableName: 'e_issue_log',
    schema: 'log'
  });
};
