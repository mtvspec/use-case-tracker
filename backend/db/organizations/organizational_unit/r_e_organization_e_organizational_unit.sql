--============================================================================--
-- Organization - Organizational unit (r_e_organization_e_organizational_unit)
--============================================================================--
CREATE TABLE organizations.r_e_organization_e_organizational_unit (
  id BIGSERIAL,
  e_organization_id BIGINT NOT NULL,
  e_organization_unit_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_organization_id
      ) REFERENCES organizations.e_organization (id),
      FOREIGN KEY (
        e_organization_unit_id
      ) REFERENCES organizations.e_organizational_unit (id)
);
--============================================================================--
