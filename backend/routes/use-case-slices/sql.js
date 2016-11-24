const Queries = {
  slices: {
    SELECT_ALL_SLICES() {
      return `
      SELECT
        ucs.id,
        ct.a_component_name "aComponentName",
        ucs.a_use_case_slice_name "aUseCaseSliceName",
        ucs.a_use_case_slice_desc "aUseCaseSliceDesc",
        ucs.a_use_case_slice_specs "aUseCaseSliceSpecs",
        st.state_en "aUseCaseSliceState"
      FROM
        components.e_component ct,
        use_case_slices.e_use_case_slice ucs,
        use_case_slices.d_use_case_slice_state st
      WHERE
        ucs.d_use_case_slice_state_id = st.id
      AND
        ucs.e_component_id = ct.id
      ORDER BY
        ucs.id
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