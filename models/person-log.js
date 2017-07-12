module.exports = (sq, dt) => {

  const PersonLog = sq
    .define('e_person_log', {
      id: {
        type: dt.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      operationID: {
        type: dt.BIGINT,
        allowNull: false
      },
      ePersonID: {
        type: dt.BIGINT,
        allowNull: false
      },
      aPersonIIN: {
        type: dt.STRING(100)
      },
      aPersonLastName: {
        type: dt.STRING(100)
      },
      aPersonFirstName: {
        type: dt.STRING(100),
        allowNull: false
      },
      aPersonMiddleName: {
        type: dt.STRING(100)
      },
      aPersonDOB: {
        type: dt.DATE
      },
      dPersonGenderID: {
        type: dt.BIGINT
      }
    }, {
      schema: 'log'
    });

  PersonLog.associate = (models) => {
    PersonLog.belongsTo(models.e_operation, { foreignKey: 'eOperationID' });
    PersonLog.belongsTo(models.e_person, { foreignKey: 'ePersonID' });
  }

  return PersonLog;

}