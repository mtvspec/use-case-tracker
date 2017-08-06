export const IssuesQueries = {
  issues: {
    selectAllIssues () {
      return `
      SELECT
        *
      FROM
        issues.e_issue
      ORDER BY
        id ASC;
      `;
    },
    selectIssueByID (id: number) {
      return `
      SELECT
        p.*
      FROM
        issues.e_issue p
      WHERE id = ${id};
      `;
    },
    insertIssue (issue) {
      return `
      INSERT INTO
        issues.e_issue (
          "aIssueName",
          "aIssueDesc",
          "updatedAt",
          "closedAt"
        )
      VALUES (
        '${issue.aIssueName}',
        ${convertData(issue.aIssueDesc)},
        null,
        null
      )
      RETURNING id;
      `;
    },
    updateIssue (issue) {
      return `
      UPDATE
        issues.e_issue
      SET
        "aIssueName" = '${issue.aIssueName}',
        "aIssueDesc" = ${convertData(issue.aIssueDesc)},
        "updatedAt" = now(),
        "modifiedAt" = now()
      WHERE
        id = ${issue.id}
      RETURNING id;
      `;
    },
    closeIssue(id) {
      return `
      UPDATE
        issues.e_issue
      SET
        "dIssueStateID" = 163,
        "closedAt" = now(),
        "updatedAt" = now(),
        "modifiedAt" = now()
      WHERE
        id = ${id}
      RETURNING id;
      `;
    },
    openIssue(id) {
      return `
      UPDATE
        issues.e_issue
      SET
        "dIssueStateID" = 136,
        "closedAt" = null,
        "updatedAt" = now(),
        "modifiedAt" = now()
      WHERE
        id = ${id}
      RETURNING id;
      `;
    }
  }
}

function convertData(data) {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}