'use strict';

const Queries = {
  sessions: {
    OPEN_SESSION(sessionData) {
      return `
      SELECT
        sessions.open_session(
          ${sessionData.userID},
          '${sessionData.token}'
        );
      `;
    },
    OPEN_SESSION_V2(sessionData) {
      return `
      INSERT INTO
        sessions.e_session (
          e_user_id,
          a_session_token
        )
      VALUES (
        ${sessionData.userID},
        '${sessionData.token}'
      ) RETURNING id "open_session";
      `;
    },
    CLOSE_SESSION(sessionID) {
      return `
      SELECT
        sessions.close_session(${sessionID});
      `;
    }
  }
}

module.exports = Queries;
