'use strict';

const Queries = {
  sessions: {
    OPEN_SESSION(id) {
      return `
      SELECT
        sessions.open_session(${id});
      `;
    },
    CLOSE_SESSION(id) {
      return `
      SELECT
        sessions.close_session(${id});
      `;
    }
  }
}

module.exports = Queries;
