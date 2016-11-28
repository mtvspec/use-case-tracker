'use strict';

const Queries = {
  dict: {
    SELECT_ALL_SLICE_STATES() {
      return `
      SELECT
        id,
        a_use_case_slice_state_name_en "aUseCaseSliceStateNameEN",
        a_use_case_slice_state_desc_en "aUseCaseSliceStateDescEN",
        a_use_case_slice_state_name_ru "aUseCaseSliceStateNameRU",
        a_use_case_slice_state_desc_ru "aUseCaseSliceStateDescRU"
      FROM
        use_case_slices.d_use_case_slice_state
      ORDER BY
        id
      ASC;
      `;
    },
    SELECT_ALL_DEFECT_STATES() {
      return `
      SELECT
        id,
        a_defect_state_name_en "aDefectStateNameEN",
        a_defect_state_desc_en "aDefectStateDescEN",
        a_defect_state_name_ru "aDefectStateNameRU",
        a_defect_state_desc_ru "aDefectStateDescRU"
      FROM
        defects.d_defect_state
      ORDER BY
        id
      ASC;
      `;
    }
  }
}
module.exports = Queries;
