--============================================================================--
-- Issue (e_issue)
--============================================================================--
CREATE TABLE issues.e_issue (
  id BIGSERIAL,
  e_issue_author_id BIGINT NOT NULL,
  d_issue_type_id INTEGER NOT NULL,
  a_issue_name VARCHAR (1000) NOT NULL,
  a_issue_desc TEXT,
  d_issue_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_issue_author_id
      ) REFERENCES projects.e_project_member (id),
      FOREIGN KEY (
        d_issue_type_id
      ) REFERENCES dict.e_dict_value (id),
      FOREIGN KEY (
        d_issue_state_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--