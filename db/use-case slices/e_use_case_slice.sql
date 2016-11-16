CREATE TABLE use_case_slices.e_use_case_slice (
  id SERIAL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_status_id INTEGER NOT NULL DEFAULT 1,
    is_deleted CHAR(1) NOT NULL DEFAULT 'N',
      PRIMARY KEY (id),
      UNIQUE (a_name, a_description),
      FOREIGN KEY (d_status_id) REFERENCES use_case_slices.d_use_case_status(id)
);

CREATE TABLE use_case_slices.e_use_case_slice_log (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_status_id INTEGER NOT NULL ,
    is_deleted CHAR(1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (e_use_case_slice_id) REFERENCES use_case_slices.e_use_case_slice (id),
      FOREIGN KEY (d_status_id) REFERENCES use_case_slices.d_use_case_status (id)
);

CREATE TABLE use_case_slices.f_use_case_status (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  d_status_id INTEGER NOT NULL DEFAULT 1,
  e_user_id INTEGER NOT NULL,
  a_state_change_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (e_use_case_slice_id) REFERENCES use_case_slices.e_use_case_slice (id),
    FOREIGN KEY (d_status_id) REFERENCES use_case_slices.d_use_case_status (id),
    FOREIGN KEY (e_user_id) REFERENCES users.e_user (id)
);
