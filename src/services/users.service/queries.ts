export default {
  users: {
    GET_USERS_TOTAL_COUNT: () => {
      return `
      SELECT
        count(u.id) "totalCount"
      FROM
        users.e_user u
      WHERE u.id != 0;`
    },
    GET_ALL_USERS: () => {
      return `
      SELECT
        u.*
      FROM
        users.e_user u
      WHERE u.id != 0;`
    },
    GET_USER_BY_ID: (userID: number) => {
      return `
      SELECT
        u.*
      FROM
        users.e_user u
      WHERE id = ${userID}
      AND u.id != 0;`
    },
    SELECT_USER_PASSWORD_BY_USERNAME: (username: string) => {
      return `
      SELECT
        u.id,
        u.password
      FROM
        users.e_user u
      WHERE u.username = '${username}';
      `;
    },
    SELECT_USER_BY_USERNAME (username) {
      return `
      SELECT
        u.*
      FROM
        users.e_user u
      WHERE u.username = '${username}';
      `;
    }
  }
}

