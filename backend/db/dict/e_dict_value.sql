--============================================================================--
-- Dictionary value (e_dict_value)
--============================================================================--
CREATE TABLE dict.e_dict_value (
  id BIGSERIAL NOT NULL,
  e_dict_id BIGINT NOT NULL,
  a_dict_value_name_en VARCHAR (1000) NOT NULL,
  a_dict_value_desc_en TEXT,
  a_dict_value_name_ru VARCHAR (1000) NOT NULL,
  a_dict_value_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_dict_id,
        a_dict_value_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        e_dict_id,
        a_dict_value_name_ru
      ),
      FOREIGN KEY (
        e_dict_id
      ) REFERENCES dict.e_dict (id)
);
--============================================================================--
