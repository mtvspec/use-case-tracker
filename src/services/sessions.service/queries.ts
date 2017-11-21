export const queries = {
  sessions: {
    OPEN_SESSION (data: { userID: number, token: string }) {
      return `
      INSERT INTO sessions.e_session (
        "userID",
        "token"
      ) VALUES (
        ${data.userID},
        '${data.token}'
      ) RETURNING *;`
    },
    CLOSE_SESSION (sessionID: number) {
      return `
      
      UPDATE sessions.e_session
      SET
        "closedAt" = now(),
        "stateID" = 'C'
      WHERE id = ${sessionID}
      RETURNING *;
      
      `
    },
    GET_USER_ID: (token: string) => {
      return `
      SELECT
        u.id
      FROM
        users.e_user u,
        sessions.e_session s
      WHERE u.id = s."userID"
      AND s."stateID" = 'O'
      AND s."token" = '${token}';`
    },
    GET_SESSION: (sessionID: number) => {
      return `
      SELECT
        s.*
      FROM
        sessions.e_session s
      WHERE s.id = '${sessionID}';`
    },
    GET_SESSION_BY_TOKEN: (token: string) => {
      return `
      SELECT
        s.*
      FROM
        sessions.e_session s
      WHERE s."stateID" = 'O'
      AND s.token = '${token}';`
    },
    REFRESH_SESSION: (sessionID: number) => {
      return `
      UPDATE sessions.e_session
      SET
        "renewedAt" = now()
      WHERE id = ${sessionID}
      RETURNING *;`
    }
  }
}