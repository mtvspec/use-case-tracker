--============================================================================--
-- Document (e_document)
--============================================================================--
CREATE TABLE documents.e_document (
  id BIGSERIAL,
  a_document_name VARCHAR (1000) NOT NULL,
  a_document_desc TEXT,
  d_document_type_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_document_type_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--