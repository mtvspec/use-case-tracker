const Queries = {
  slices: {
    SELECT_ALL_SLICES() {
      return `
      SELECT
        id,
        e_use_case_id "eUseCaseID",
        e_component_id "eComponentID",
        a_use_case_slice_code "aUseCaseSliceCode",
        a_use_case_slice_name "aUseCaseSliceName",
        a_use_case_slice_desc "aUseCaseSliceDesc",
        a_use_case_slice_specs "aUseCaseSliceSpecs",
        d_use_case_slice_state_id "dUseCaseSliceStateID"
      FROM
        use_case_slices.e_use_case_slice
      ORDER BY
        id
      ASC;
      `;
    },
    UPDATE_SLICE(slice) {
      return `
      UPDATE
        use_case_slices.e_use_case_slice
      SET
        a_use_case_slice_name = '${slice.sliceName}',
        a_use_case_slice_desc = '${slice.sliceDesc}',
        a_use_case_slice_specs = '${slice.sliceSpecs}'
      WHERE
        id = ${slice.id}
      RETURNING
        id;
      `;
    }
  }
}

module.exports = Queries;
