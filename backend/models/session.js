module.exports = function SessionModel(sequelize, DataTypes) {
  const Session = sequelize
    .define('e_session', {
      id:
      {
        type: 'BIGINT',
        allowNull: false,
        autoIncrement: true,
        special: [],
        primaryKey: true
      },
      eUserID:
      {
        type: 'BIGINT',
        allowNull: false,
        defaultValue: null,
        special: [],
        primaryKey: false
      },
      aToken:
      {
        type: 'CHARACTER VARYING',
        allowNull: false,
        defaultValue: null,
        special: [],
        primaryKey: false
      },
      openedAt:
      {
        type: 'TIMESTAMP WITH TIME ZONE',
        allowNull: false,
        defaultValue: 'now()',
        special: [],
        primaryKey: false
      },
      closedAt:
      {
        type: 'TIMESTAMP WITH TIME ZONE',
        allowNull: true,
        defaultValue: null,
        special: [],
        primaryKey: false
      },
      dSessionStateID:
      {
        type: 'CHARACTER',
        allowNull: false,
        defaultValue: 'O',
        special: [],
        primaryKey: false
      }
    }, {
      timestamps: false,
      schema: 'sessions'
    });
  return Session;
}