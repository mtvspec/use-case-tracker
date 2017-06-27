'use strict';

module.exports = (sq, dt) => {

  const ProjectMemberModel = sq
  .define('e_project_member', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    eProjectTeamID: {
      type: dt.BIGINT,
      allowNull: false
    },
    ePersonID: {
      type: dt.BIGINT,
      allowNull: false
    },
    dProjectMemberStateID: {
      type: dt.BIGINT
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
    schema: 'projects'
  });

  ProjectMemberModel.associate = (models) => {
    ProjectMemberModel.belongsTo(models.e_project_team, { foreignKey: 'eProjectTeamID' });
    ProjectMemberModel.belongsTo(models.e_person, { foreignKey: 'ePersonID' });
  }

  return ProjectMemberModel;

}