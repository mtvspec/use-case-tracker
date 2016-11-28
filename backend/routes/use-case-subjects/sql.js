'use strict';

const Queries = {
  subjects: {
    SELECT_ALL_SUBJECTS() {
      return `
      SELECT
        id,
        e_component_id "eComponentID",
        a_use_case_subject_name "aUseCaseSubjectName",
        a_use_case_subject_desc "aUseCaseSubjectDesc",
        d_use_case_subject_state_id "dUseCaseSubjectStateID"
      FROM
        use_cases.e_use_case_subject
      ORDER BY
        id
      ASC;
      `;
    }
  }
}

module.exports = Queries;
