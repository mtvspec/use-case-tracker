--============================================================================--
-- Use-case slice (e_use_case_slice)
--============================================================================--
-- TODO: update - table use-case-slice specs
-- TODO: implement use-case slice code generator
CREATE TABLE use_case_slices.e_use_case_slice (
  id BIGSERIAL NOT NULL,
  e_use_case_id BIGINT NOT NULL,
  a_use_case_slice_code CHAR (3),
  a_use_case_slice_name VARCHAR (1000) NOT NULL,
  a_use_case_slice_desc TEXT,
  e_use_case_slice_specification_id BIGINT,
  a_story_points INTEGER,
  e_target_release BIGINT,
  d_use_case_slice_state_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_use_case_id,
        a_use_case_slice_code
      ),
      FOREIGN KEY (
        e_use_case_id
      ) REFERENCES use_cases.e_use_case (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        d_use_case_slice_state_id
      ) REFERENCES dict.e_vict_value (id)
);
--============================================================================--
-- Use-case slice log (e_use_case_slice_log)
--============================================================================--
-- TODO: update table definition
CREATE TABLE log.e_use_case_slice_log (
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
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--
