/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_organization_log', {
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
    eOrganizationID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_organization',
        key: 'id'
      }
    },
    aOrganizationBin: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    aOrganizationShortName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aORganizationOfficialName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'e_organization_log'
  });
};
