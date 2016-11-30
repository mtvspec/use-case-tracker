--============================================================================--
-- Organization operation (d_organization_operation)
--============================================================================--
CREATE TABLE organizations.d_organization_operation (
  id SERIAL NOT NULL,
  a_organization_operation_name_en VARCHAR (1000) NOT NULL,
  a_organization_operation_desc_en TEXT,
  a_organization_operation_name_ru VARCHAR (1000) NOT NULL,
  a_organization_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_organization_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_organization_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  organizations.d_organization_operation (
    a_organization_operation_name_en,
    a_organization_operation_name_ru
  )
VALUES
(
  'Create organization',
  'Создать организацию'
);
--============================================================================--
