--============================================================================--
-- Tags (tags)
--============================================================================--
CREATE TABLE tags.e_tag (
  id BIGSERIAL,
  a_tag_name VARCHAR (200) NOT NULL,
  a_tag_desc TEXT,
  d_tag_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_tag_state_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--