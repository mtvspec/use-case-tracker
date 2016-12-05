--============================================================================--
-- Dictionary (e_dict)
--============================================================================--
CREATE TABLE dict.e_dict (
  id BIGSERIAL NOT NULL,
  a_dict_name_en VARCHAR (1000) NOT NULL,
  a_dict_desc_en TEXT,
  a_dict_name_ru VARCHAR (1000) NOT NULL,
  a_dict_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_dict_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_dict_name_ru
      )
);
--============================================================================--
