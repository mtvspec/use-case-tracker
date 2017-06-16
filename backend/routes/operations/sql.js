'use strict';

const Queries = {
  operations: {
    SELECT_ALL_OPERATIONS() {
      return `
      SELECT
        *
      FROM
        operations.e_operation
      ORDER BY
        id ASC;
      `;
    },
    INSERT_OPERATION(data) {
      return `
      INSERT INTO operations.e_operation(
        d_operation_type_id,
        e_session_id
      ) VALUES (
        ${data.operationTypeID},
        ${data.sessionID}
      ) RETURNING id;
      `;
    }
  }
}

module.exports = Queries;