CREATE TABLE log.e_project_team_log
(
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_project_team_id BIGINT NOT NULL,
  a_project_team_name VARCHAR (1000),
  a_project_team_desc TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (
    id
  ),
  FOREIGN KEY (
    e_operation_id
  ) REFERENCES operations.e_operation (id),
  FOREIGN KEY (
    e_project_team_id
  ) REFERENCES projects.e_project_team (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE log.e_project_team_log
    OWNER to mtvspec;