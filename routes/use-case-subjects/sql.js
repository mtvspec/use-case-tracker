'use strict';

const Queries = {
  useCaseSubjects: {
    SELECT_ALL_SUBJECTS() {
      return `
      SELECT
        id,
        e_component_id "eComponentID",
        a_use_case_subject_name "aUseCaseSubjectName",
        a_use_case_subject_desc "aUseCaseSubjectDesc",
        d_use_case_subject_state_id "dUseCaseSubjectStateID",
        is_deleted "isDeleted"
      FROM
        use_cases.e_use_case_subject
      ORDER BY
        id
      ASC;
      `;
    },
    INSERT_SUBJECT(useCaseSubject, session, user) {
      return `
      SELECT
        use_cases.create_use_case_subject(
          v_e_component_id := ${useCaseSubject.eComponentID},
          v_a_use_case_subject_name := '${useCaseSubject.aUseCaseSubjectName}',
          v_a_use_case_subject_desc := '${useCaseSubject.aUseCaseSubjectDesc}',
          v_e_session_id := ${session.id},
          v_e_user_id := ${user.id}
        );
      `;
    }
  }
}

module.exports = Queries;
