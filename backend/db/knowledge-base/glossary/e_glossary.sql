--============================================================================--
-- Glossary term
--============================================================================--
CREATE TABLE knowledge_base.e_glossary_term (
  id BIGSERIAL NOT NULL,
  glossary_term_en VARCHAR (1000) NOT NULL,
  glossary_term_defenition_en TEXT,
  glossary_term_ru VARCHAR (1000),
  glossary_term_defenition_ru TEXT,
    PRIMARY KEY (
      glossary_term_en
    ),
    UNIQUE (
      id
    )
);
--============================================================================--
