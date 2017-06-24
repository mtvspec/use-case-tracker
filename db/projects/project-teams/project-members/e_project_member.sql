--============================================================================--
-- Project member (e_project_member)
--============================================================================--
CREATE TABLE projects.e_project_member (
  id BIGSERIAL,
  e_project_team_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  d_project_member_state_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
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
--============================================================================--
