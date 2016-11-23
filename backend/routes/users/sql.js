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
    }
  }
}

module.exports = Queries;
