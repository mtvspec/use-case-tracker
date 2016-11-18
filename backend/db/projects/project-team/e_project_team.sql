CREATE TABLE projects.e_project_team (
  id SERIAL NOT NULL,
  e_project_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_project_id
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        e_project_id
      ) REFERENCES projects.e_project (id)
);
