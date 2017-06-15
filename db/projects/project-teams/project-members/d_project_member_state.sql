--============================================================================--
-- Project team member states (d_project_team_member_state)
--============================================================================--
CREATE TABLE projects.d_project_team_member_state (
  id SERIAL,
  a_project_member_state_name_en VARCHAR (1000) NOT NULL,
  a_project_member_state_desc_en TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE KEY (
        a_project_member_state_en
      )
);
--============================================================================--