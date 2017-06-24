const Queries = {
  organizationalUnits: {
    SELECT_ALL_ORGANIZATIONAL_UNITS() {
      return `
      SELECT
        ou.id "key",
        ou.e_organizational_unit_id "parent",
        ou.a_organizational_unit_name "name",
        ou.is_deleted "isDeleted"
      FROM
        organizations.e_organizational_unit ou
      WHERE id <> 0
      ORDER BY
        ou.id ASC;
      `;
    },
    SELECT_ORGANIZATIONAL_UNIT_BY_ID(organizationalUnit) {
      return `
      SELECT
        ou.id "key",
        ou.e_organizational_unit_id "parent",
        ou.a_organizational_unit_name "name",
        ou.is_deleted "isDeleted"
      FROM
        organizations.e_organizational_unit ou
      WHERE id = ${organizationalUnit.id};
      `;
    },
    INSERT_ORGANIZATIONAL_UNIT(organizationalUnit) {
      return `
      INSERT INTO organizations.e_organizational_unit (
        e_organizational_unit_id,
        d_organizational_unit_kind_id,
        d_organizational_unit_type_id,
        a_organizational_unit_name,
        a_organizational_unit_desc,
        d_organizational_unit_state_id
      ) VALUES (
        ${organizationalUnit.eOrganizationalUnitID},
        ${convertData(organizationalUnit.dOrganizationalUnitKindID)},
        ${convertData(organizationalUnit.dOrganizationalTypeID)},
        '${organizationalUnit.aOrganizationalUnitName}',
        ${convertData(organizationalUnit.aOrganizationalUnitDesc)},
        148
      ) RETURNING
        id "key",
        e_organizational_unit_id "parent",
        a_organizational_unit_name "name",
        is_deleted "isDeleted";
      `;
    },
    UPDATE_ORGANIZATIONAL_UNIT(organizationalUnit) {
      return `
      UPDATE organizations.e_organizational_unit
      SET e_organizational_unit_id = ${convertData(organizationalUnit.eOrganizationalUnitID)},
      d_organizational_unit_kind_id = ${convertData(organizationalUnit.dOrganizationalUnitKindID)},
      d_organizational_unit_type_id = ${convertData(organizationalUnit.dOrganizationalUnitTypeID)},
      a_organizational_unit_name = '${organizationalUnit.aOrganizationalUnitName}',
      a_organizational_unit_desc = ${convertData(organizationalUnit.aOrganizationalUnitDesc)},
      d_organizational_unit_state_id = 150
      WHERE id = ${organizationalUnit.id}
      RETURNING
        id "key",
        e_organizational_unit_id "parent",
        a_organizational_unit_name "name",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}