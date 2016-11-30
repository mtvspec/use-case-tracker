--============================================================================--
-- Organization (e_organization)
--============================================================================--
CREATE TABLE organizations.e_organization (
  id BIGSERIAL,
  a_organization_bin CHAR (12),
  a_organization_short_name VARCHAR (1000),
  a_organization_official_name VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_bin
      )
);
--============================================================================--
