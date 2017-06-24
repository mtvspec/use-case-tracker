CREATE TABLE log.e_issue_log (
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_issue_id BIGINT NOT NULL,
  e_issue_author_id BIGINT,
  d_issue_type_id BIGINT,
  a_issue_name VARCHAR (1000),
  a_issue_desc TEXT,
  d_issue_state_id BIGINT,
    is_deleted BOOLEAN DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_operation_id
      ) REFERENCES operations.e_operation (id),
      FOREIGN KEY (
        e_issue_id
      ) REFERENCES issues.e_issue (id),
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