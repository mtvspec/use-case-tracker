/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_project_log', {
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
    eProjectID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_project',
        key: 'id'
      }
    },
    dProjectKindID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    eCustomerID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_customer',
        key: 'id'
      }
    },
    aProjectName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aProjectDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eContractID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_document',
        key: 'id'
      }
    },
    eProjectManagerID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_emp',
        key: 'id'
      }
    },
    eProjectPlanID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_document',
        key: 'id'
      }
    },
    aOfficialProjectName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aPlanStartDate: {
      type: DataTypes.TIME,
      allowNull: true
    },
    aPlanEndDate: {
      type: DataTypes.TIME,
      allowNull: true
    },
    aPlanBudget: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    aFactStartDate: {
      type: DataTypes.TIME,
      allowNull: true
    },
    aFactEndDate: {
      type: DataTypes.TIME,
      allowNull: true
    },
    aFactBudget: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dProjectStateID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'e_project_log'
  });
};
