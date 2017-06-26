'use strict';

module.exports = function (sq, dt) {

  const OrganizationModel = sq
    .define('e_organization', {
      id: {
        type: dt.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      aOrganizationBin: {
        type: dt.CHAR(12),
        validate: {
          len: [12, 12]
        }
      },
      aOrganizationShortName: {
        type: dt.STRING(1000),
        allowNull: false,
        validate: {
          len: [2, 1000]
        }
      },
      aOrganizationOfficialName: {
        type: dt.STRING(4000),
        validate: {
          len: [2, 4000]
        }
      },
      isDeleted: {
        type: dt.BOOLEAN,
        defaultValue: false 
      }
    }, {
      schema: 'organizations'
    })

  return OrganizationModel

}