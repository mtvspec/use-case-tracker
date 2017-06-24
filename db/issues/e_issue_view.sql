CREATE OR REPLACE VIEW issues.e_issue_view
AS
SELECT
  id,
  e_issue_author_id "eIssueAuthorID",
  d_issue_type_id "dIssueTypeID",
  a_issue_name "aIssueName",
  a_issue_desc "aIssueDesc",
  d_issue_state_id "dIssueStateID",
  is_deleted "isDeleted"
FROM
  issues.e_issue t
ORDER BY
  id ASC;