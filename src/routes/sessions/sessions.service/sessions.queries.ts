export const SessionQueries = {
  sessions: {
    openSession ( data: { eUserID: number, aToken: string }) {
      return `
      INSERT INTO
        sessions.e_session (
          "eUserID",
          "aToken"
        )
      VALUES (
        ${data.eUserID},
        '${data.aToken}'
      )
      RETURNING
        id,
        "eUserID",
        "aToken";
      `;
    },
    closeSession (SessionID) {
      return `
      UPDATE
        sessions.e_session
      SET
        "closedAt" = now(),
        "dSessionStateID" = 'C'
      WHERE id = ${SessionID}
      RETURNING id;
      `;
    }
  }
}