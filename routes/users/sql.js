const Queries = {
  users: {
    SELECT_ALL_USERS() {
      return `
      SELECT
        u.id,
        p.a_person_first_name||' '||a_person_last_name "aPerson",
        u.u_username "aUsername",
        u.a_user_email "aUserEmail",
        u.d_user_state_id "dUserStateID",
        u.is_deleted "isDeleted"
      FROM
        users.e_user u,
        persons.e_person p
      WHERE
        u.e_person_id = p.id;
      `;
    },
    SELECT_USER_ID_AND_PASSWORD_BY_USERNAME(username) {
      return `
      SELECT
        u.id,
        u.u_password
      FROM
        users.e_user u
      WHERE
        u.u_username = '${username}';
      `;
    },
    SELECT_USER_BY_ID(userID) {
      return `
      SELECT
        u.id
      FROM
        users.e_user u
      WHERE
        u.id = ${userID};
      `;
    },
    SELECT_USER_ID_BY_USERNAME(username) {
      return `
      SELECT
        u.id
      FROM
        users.e_user u
      WHERE
        u.u_username = '${username}';
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
    },
    INSERT_USER(userData, session) {
      return `
      INSERT INTO
        users.e_user (
          e_person_id,
          u_username,
          u_password,
          a_user_email
        ) values (
          ${userData.ePersonID},
          '${userData.username}',
          '${userData.password}',
          '${userData.aUserEmail}'
        )
      RETURNING
        id;
      `;
    }
  }
}

module.exports = Queries;
