const Queries = {
  users: {
    SELECT_USER(user) {
      return `
      SELECT
        id,
        u.u_password
      FROM
        users.e_user u
      WHERE
        u.u_username = '${user.username}';
      `;
    },
    SELECT_USER_BY_ID(id) {
      return `
      SELECT
        id
      FROM
        users.e_user u
      WHERE
        u.id = id;
      `;
    },
    SELECT_USER_AND_SESSION_ID_BY_SESSION_TOKEN(token) {
      console.log('token:\n', token);
      return `
      SELECT
        s.id "sessionID",
        s.e_user_id "userID"
      FROM
        sessions.e_session s
      WHERE
        s.a_token = '${token}'
      AND
        s.d_session_state_id = 'O';
      `;
    }
  }
}

module.exports = Queries;
