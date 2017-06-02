const Queries = {
  users: {
    SELECT_ALL_USERS() {
      return `
      SELECT
        *
      FROM
        users.e_user;
      `;
    },
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
    SELECT_USER_ID_BY_USERNAME(username) {
      return `
      SELECT
        id
      FROM
        users.e_user
      WHERE
        u_username = '${username}';
      `
    },
    SELECT_USER_AND_SESSION_ID_BY_SESSION_TOKEN(token) {
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
    },
    SELECT_USER_DATA_BY_ID(userID) {
      return `
      SELECT
        p.a_person_last_name "aPersonLastName",
        p.a_person_first_name "aPersonFirstName",
        p.a_person_middle_name "aPersonMiddleName"
      FROM
        persons.e_person p,
        users.e_user u
      WHERE
        u.e_person_id = p.id
      AND
        u.id = ${userID};
      `;
    }
  }
}

module.exports = Queries;
