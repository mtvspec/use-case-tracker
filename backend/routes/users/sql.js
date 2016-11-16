const Queries = {
  users: {
    SELECT_USER(user) {
      return `
      SELECT
        id
      FROM
        users.e_user u
      WHERE
        u.u_username = '${user.username}'
      AND
        u.u_password = '${user.password}';`;
    }
  }
}

module.exports = Queries;
