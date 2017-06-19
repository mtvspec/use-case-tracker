--============================================================================--
-- Organizations view
--============================================================================--
CREATE OR REPLACE VIEW organizations.e_organization_view
AS  
SELECT
  id,
  a_organization_bin "aOrganizationBin",
  a_organization_short_name "aOrganizationShortName",
  a_organization_official_name "aOrganizationOfficialName",
  is_deleted "isDeleted"
FROM
  organizations.e_organization
ORDER BY
  id ASC;
--============================================================================--