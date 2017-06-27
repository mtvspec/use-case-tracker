'use strict';

module.exports = (sq, dt) => {

  const ProjectModel = sq
  .define('e_project', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    dProjectKindID: {
      type: dt.BIGINT
    },
    eCustomerID: {
      type: dt.BIGINT
    },
    aProjectName: {
      type: dt.SRTING(100),
      allowNul: false,
      unique: true
    },
    aProjectDesc: {
      type: dt.TEXT
    },
    eContractID: {
      type: dt.BIGINT
    },
    eProjectManagerID: {
      type: dt.BIGINT
    },
    eProjectPlanID: {
      type: dt.BIGINT
    },
    aOfficialProjectName:{
      type: dt.STRING(4000)
    },
    aPlanStartDate: {
      type: dt.DATE
    },
    aPlanEndDate: {
      type: dt.DATE
    }
  }, {
    schema: 'projects'
  })

  ProjectModel.associate = (models) => {
    ProjectModel.belongsTo(models.e_dict_value, { foreignKey: 'dProjectID' });
    ProjectModel.belongsTo(models.e_customer, { foreignKey: 'eCustomerID' });
    ProjectModel.belongsTo(models.e_document, {foreignKey: 'eContractID' });
    ProjectModel.belongsTo(models.e_document), { foreignKey: 'eProjectPlanID'};
    ProjectModel.belongsTo(models.e_emp, {foreignKey: 'eProjectManagerID'});
  }

  return ProjectModel;

}