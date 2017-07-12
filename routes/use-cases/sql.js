'use strict';

const Queries = {
  useCases: {
    SELECT_ALL_USE_CASES() {
      return `
      SELECT
        id,
        e_use_case_subject_id "eUseCaseSubjectID",
        e_component_id "eComponentID",
        e_primary_actor_id "ePrimaryActorID",
        a_use_case_name "aUseCaseName",
        a_use_case_desc "aUseCaseDesc",
        d_use_case_level_id "dUseCaseLevelID",
        d_use_case_type_id "dUseCaseTypeID",
        d_use_case_state_id "dUseCaseStateID",
        is_deleted "isDeleted"
      FROM
        use_cases.e_use_case
      ORDER BY
        id
      ASC;
      `;
    }
  }
}

module.exports = Queries;
