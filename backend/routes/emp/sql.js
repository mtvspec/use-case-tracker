const Queries = {
  emp: {
    SELECT_ALL_EMP() {
      return `
      SELECT
        e.id,
        e.e_person_id "ePersonID",
        e.e_emp_positional_unit_id "eEmpPositionalUnitID",
        e.d_emp_state_id "eEmpStateID",
        e.is_deleted "isDeleted"
      FROM
        emp.e_emp e;
      `;
    }
  }
}

module.exports = Queries;