/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_person_log', {
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
    ePersonID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_person',
        key: 'id'
      }
    },
    aPersonIIN: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    aPersonLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aPersonFirstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aPersonMiddleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aPersonDOB: {
      type: DataTypes.TIME,
      allowNull: true
    },
    dPersonGenderID: {
      type: DataTypes.INTEGER,
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
    tableName: 'e_person_log'
  });
};
