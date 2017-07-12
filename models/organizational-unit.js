'use strict';

module.exports = (sq, dt) => {
  return sq.define('e_organizational_unit', {
    id: {
      type: dt.BIGINT,
      primaryKey: true,
      autoincrement: true
    },
    eOrganizationalUnitID: {
      type: dt.BIGINT,
      referenses: {
        model: 'e_organization',
        key: 'id'
      }
    },
    dOrganizationalUnitKindID: {
      type: dt.BIGINT,
      referenses: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    dOrganizationalUnitTypeID: {
      type: dt.BIGINT,
      referenses: {
        model: 'e_dict_value',
        key: 'id'
      }
    },
    aOrganizationalUnitName: {
      type: dt.STRING(1000),
      allowNull: false,
      validate: {
        len: [2, 1000]
      }
    },
    aOrganizationalUnitDesc: {
      type: dt.TEXT
    },
    dOrganizationalUnitStateID: {
      type: dt.BIGINT,
      allowNull: false,
      referenses: {
        model: 'e_dict_value',
        key: 'id'
      }
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
      schema: 'organizations'
    });
}