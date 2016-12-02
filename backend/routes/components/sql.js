'use strict';

const Queries = {
  components: {
    SELECT_ALL_COMPONENTS() {
      return `
      SELECT
        id,
        e_component_id "eComponentID",
        d_component_type_id "dComponentTypeID",
        a_component_name "aComponentName",
        a_component_desc "aComponentDesc",
        d_component_state_id "dComponentStateID",
        is_deleted "isDeleted"
      FROM
        components.e_component
      ORDER BY
        id
      ASC;
      `;
    }
  }
}

module.exports = Queries;
