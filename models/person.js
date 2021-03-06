'use strict';

module.exports = function (sq, dt) {

  const PersonModel = sq
    .define('e_person', {
      id: {
        type: dt.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      aPersonIIN: {
        type: dt.CHAR(12),
        validate: {
          len: [12, 12]
        }
      },
      aPersonLastName: {
        type: dt.STRING(100),
        validate: {
          len: [2, 100]
        }
      },
      aPersonFirstName: {
        type: dt.STRING(100),
        allowNull: false,
        validate: {
          len: [2, 100]
        }
      },
      aPersonMiddleName: {
        type: dt.STRING(100)
      },
      aPersonDOB: {
        type: dt.DATE
      },
      dPersonGenderID: {
        type: dt.BIGINT
      },
      isDeleted: {
        type: dt.BOOLEAN,
        defaultValue: false 
      }
    }, {
      schema: 'persons'
    });

  return PersonModel;

}