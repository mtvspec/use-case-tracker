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
    CLOSE_SESSION(token) {
      return `
      SELECT
        sessions.close_session('${token}');
      `;
    }
  }
}

module.exports = Queries;
