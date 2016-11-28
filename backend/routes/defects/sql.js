'use strict';

const Queries = {
  defects: {
    SELECT_ALL_DEFECTS() {
      return `
      SELECT
        id,
        d_defect_kind_id "dDefectKindID",
        e_use_case_slice_id "eUseCaseSliceID",
        a_defect_name "aDefectName",
        a_defect_desc "aDefectDesc",
        d_defect_state_id "dDefectStateID",
        is_deleted "isDeleted"
      FROM
        defects.e_defect
      ORDER BY
        id
      ASC;
      `;
    }
  }
}

module.exports = Queries;
