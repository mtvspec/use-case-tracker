--============================================================================--
-- Organization log (e_organzation_log)
--============================================================================--
CREATE TABLE log.e_organization_log (
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_organization_id BIGINT NOT NULL,
  a_organization_bin CHAR (12),
  a_organization_short_name VARCHAR (1000),
  a_organization_official_name VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      )
);
--============================================================================--