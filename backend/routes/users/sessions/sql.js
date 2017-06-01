'use strict';

const Queries = {
  sessions: {
    OPEN_SESSION(id) {
      return `
      SELECT
        sessions.open_session(
          ${id}
        );
      `;
    },
    SET_SESSION_TOKEN(id, token) {
      return `
      UPDATE
        sessions.e_session
      SET
        a_token = '${token}'
      WHERE
        id = ${id}
      RETURNING
        id;
        `
    },
    CLOSE_SESSION(token) {
      return `
      SELECT
        sessions.close_session('${token}');
      `;
    }
  }
}

module.exports = Queries;
