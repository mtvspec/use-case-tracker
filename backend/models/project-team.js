'use strict';

module.exports = (sq, dt) => {

  const ProjectTeamModel = sq
  .define('e_project_team', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    aProjectTeamName: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        let: [2, 1000]
      }
    },
    aProjectTeamDesc: {
      type: dt.TEXT
    },
    isDeleted: {
      type: dt.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, { schema: 'projects' });

  return ProjectTeamModel;

}