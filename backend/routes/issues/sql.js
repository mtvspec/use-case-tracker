const Queries = {
  issues: {
    SELECT_ALL_ISSUES() {
      return `
      SELECT
        i.*
      FROM
        issues.e_issue_view i;
      `;
    },
    INSERT_ISSUE(issue) {
      return `
      INSERT INTO issues.e_issue (
        e_issue_author_id,
        d_issue_type_id,
        a_issue_name,
        a_issue_desc,
        d_issue_state_id
      ) VALUES (
        ${issue.eIssueAuthorID},
        ${issue.dIssueTypeID},
        '${issue.aIssueName}',
        ${convertData(issue.aIssueDesc)},
        136
      ) RETURNING
        id,
        e_issue_author_id "eIssueAuthorID",
        d_issue_type_id "dIssueTypeID",
        a_issue_name "aIssueName",
        a_issue_desc "aIssueDesc",
        d_issue_state_id "dIssueStateID",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = 'null';
  else return `${data ? "'" + data + "'" : 'null'}`;
}
