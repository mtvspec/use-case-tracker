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
        type: dt.STRING(1000),
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
      aOfficialProjectName: {
        type: dt.STRING(4000)
      },
      aPlanStartDate: {
        type: dt.DATE
      },
      aPlanEndDate: {
        type: dt.DATE
      },
      aPlanBudget: {
        type: dt.NUMERIC
      },
      aFactStartDate: {
        type: dt.DATE
      },
      aFactEndDate: {
        type: dt.DATE
      },
      aFactBudget: {
        type: dt.NUMERIC
      },
      dProjectStateID: {
        type: dt.BIGINT,
        allowNull: false,
        defaultValue: 47
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

  ProjectModel.associate = (models) => {
    ProjectModel.belongsTo(models.e_dict_value, { foreignKey: 'dProjectKindID' });
    ProjectModel.belongsTo(models.e_customer, { foreignKey: 'eCustomerID' });
    ProjectModel.belongsTo(models.e_document, { foreignKey: 'eContractID' });
    ProjectModel.belongsTo(models.e_document, { foreignKey: 'eProjectPlanID' });
    ProjectModel.belongsTo(models.e_emp, { foreignKey: 'eProjectManagerID' });
    ProjectModel.belongsTo(models.e_dict_value, { foreignKey: 'dProjectStateID' });
  }

  return ProjectModel;

}