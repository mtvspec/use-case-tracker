export const UsersQueries = {
  users: {
    selectAllUsers: `
    SELECT
      u."id",
      u."personID",
      u."username",
      p."firstName",
      p."lastName",
      u."email",
      u."userStateID",
      u."isDeleted"
    FROM
      users.e_user u,
      persons.e_person p
    WHERE
      u."personID" = p.id 
    ORDER BY
      u.id ASC;
    `,
    selectUserByUsername (username) {
      return `
      SELECT
        u.*
      FROM
        users.e_user u
      WHERE u.username = '${username}';
      `;
    },
    selectSession (token) {
      return `
      SELECT
        *
      FROM
        sessions.e_session
      WHERE "aToken" = '${token}';
      `;
    }
  }
}