/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_project_member', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eProjectTeamID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'e_project_team',
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
    dProjectMemberStateID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '142',
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
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'e_project_member',
    schema: 'projects'
  });
};
