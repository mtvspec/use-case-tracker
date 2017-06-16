--============================================================================--
-- Tag - Issue relationship (r_e_tag_e_issue)
--============================================================================--
CREATE TABLE tags.r_e_tag_e_issue (
  id BIGSERIAL,
  e_tag_id BIGINT NOT NULL,
  e_issue_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_tag_id
      ) REFERENCES tags.e_tag (id),
      FOREIGN KEY (
        e_issue_id
      ) REFERENCES issues.e_issue (id)
);
--============================================================================--