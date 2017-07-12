/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('e_task', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    aTaskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aTaskDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dTaskStateID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '162',
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
    schema: 'tasks'
  });
};
