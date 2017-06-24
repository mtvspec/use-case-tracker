CREATE TABLE log.e_project_member_log
(
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_project_member_id BIGINT NOT NULL,
  e_project_team_id BIGINT,
  e_person_id BIGINT,
  d_project_member_state_id BIGINT,
  is_deleted BOOLEAN,
  PRIMARY KEY (
    id
  ),
  FOREIGN KEY (
    e_operation_id
  ) REFERENCES operations.e_operation (id),
  FOREIGN KEY (
    e_project_member_id
  ) REFERENCES projects.e_project_member (id),
  FOREIGN KEY (
    e_project_team_id
  ) REFERENCES projects.e_project_team (id),
  FOREIGN KEY (
    e_person_id
  ) REFERENCES persons.e_person (id),
  FOREIGN KEY (
    d_project_member_state_id
  ) REFERENCES dict.e_dict_value (id)
);
