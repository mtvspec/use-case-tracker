CREATE TABLE use_case_slices.e_use_case_slice (
  id SERIAL,
  e_component_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_use_case_slice_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_name,
        a_description
      ),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        d_use_case_slice_state_id
      ) REFERENCES use_case_slices.d_use_case_slice_state (id)
);

CREATE TABLE use_case_slices.e_use_case_slice_log (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_use_case_slice_state_id INTEGER NOT NULL ,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_use_case_slice_id
      ) REFERENCES use_case_slices.e_use_case_slice (id),
      FOREIGN KEY (
        d_use_case_slice_status_id
      ) REFERENCES use_case_slices.d_use_case_state (id)
);

CREATE TABLE use_case_slices.f_use_case_slice_status (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  d_use_case_slice_state_id INTEGER NOT NULL DEFAULT 1,
  e_user_id INTEGER NOT NULL,
  a_state_change_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_use_case_slice_id
    ) REFERENCES use_case_slices.e_use_case_slice (id),
    FOREIGN KEY (
      d_use_case_slice_status_id
    ) REFERENCES use_case_slices.d_use_case_state (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
);

CREATE VIEW use_case_slices.v_use_case_slices
AS
SELECT
  u.id "Код",
  ct.a_name "Компонент",
  u.a_name "Наименование",
  s.state_en "Статус"
FROM
  use_case_slices.e_use_case_slice u,
  components.e_component ct,
  use_case_slices.d_use_case_slice_state s
WHERE
  u.e_component_id = ct.id
AND
  u.d_use_case_slice_state_id = s.id
ORDER BY
  ct.a_name,
  u.a_name
ASC;