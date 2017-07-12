'use strict';

module.exports = (sq, dt) => {

  const IssueModel = sq
  .define('e_issue', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    eIssueAuthorID: {
      type: dt.BIGINT
    },
    dIssueTypeID: {
      type: dt.BIGINT
    },
    aIssueName: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        len: [2, 1000]
      }
    },
    aIssueDesc: {
      type: dt.TEXT
    },
    dIssueStateID: {
      type: dt.BIGINT,
      allowNull: false,
      defaultValue: 134
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, {
    schema: 'issues' 
  });

  IssueModel.associate = (models) => {
    IssueModel.belongsTo(models.e_project_member, { foreignKey: 'eIssueAuthorID' });
    IssueModel.belongsTo(models.e_dict_value, { foreignKey: 'dIssueTypeID' });
    IssueModel.belongsTo(models.e_dict_value, { foreignKey: 'dIssueStateID' });
  }

  return IssueModel;

}