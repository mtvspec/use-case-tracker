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
    SELECT_USER_BY_SESSION_ID(session) {
      return `
      SELECT
        s.e_user_id "id"
      FROM
        sessions.e_session s
      WHERE
        s.token = '${session}'
      AND
        s.status_id = 'O';
      `;
    }
  }
}

module.exports = Queries;
