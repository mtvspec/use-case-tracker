CREATE OR REPLACE VIEW projects.e_project_view
AS
SELECT
  p.id,
  k.a_dict_value_name_en "aProjectKindNameEN",
  o.a_organization_short_name "aOrganizationName",
  c.a_customer_name "aCustomerName",
  p.a_project_name "aProjectName",
  p.a_project_desc "aProjectDesc",
  pc.a_document_name "aContractName",
  m.a_person_first_name||' '||m.a_person_last_name "aProjectManagerFirstName&LastName",
  pp.a_document_name "aProjectPlanName",
  p.a_official_project_name "aOfficialProjectName",
  p.a_plan_start_date "aPlanStartDate",
  p.a_plan_end_date "aPlanEndDate",
  p.a_plan_budget "aPlanBudget",
  p.a_fact_start_date "aFactStartDate",
  p.a_fact_end_date "aFactEndDate",
  p.a_fact_budget "aFactBudget",
  s.a_dict_value_name_en "aProjectStateNameEN",
  p.is_deleted "isDeleted"
FROM
  projects.e_project p,
  dict.e_dict_value k,
  customers.e_customer c,
  organizations.e_organization o,
  documents.e_document pp,
  documents.e_document pc,
  dict.e_dict_value s,
  persons.e_person m
LEFT JOIN emp.e_emp e ON projects.e_project.e_project_manager_id = e.id 
WHERE p.e_customer_id = c.id
AND p.d_project_kind_id = k.id
AND e.e_person_id = m.id
AND c.e_organization_id = o.id
AND p.e_contract_id = pc.id
AND p.e_project_plan_id = pp.id
AND p.d_project_state_id = s.id
ORDER BY
  p.id ASC;

CREATE OR REPLACE VIEW projects.e_project_view
AS
SELECT
  p.id,
  k.a_dict_value_name_en "aProjectKindNameEN",
  o.a_organization_short_name "aOrganizationName",
  c.a_customer_name "aCustomerName",
  p.a_project_name "aProjectName",
  p.a_project_desc "aProjectDesc",
  pc.a_document_name "aContractName",
  m.a_person_first_name||' '||m.a_person_last_name "aProjectManagerFirstName&LastName",
  pp.a_document_name "aProjectPlanName",
  p.a_official_project_name "aOfficialProjectName",
  p.a_plan_start_date "aPlanStartDate",
  p.a_plan_end_date "aPlanEndDate",
  p.a_plan_budget "aPlanBudget",
  p.a_fact_start_date "aFactStartDate",
  p.a_fact_end_date "aFactEndDate",
  p.a_fact_budget "aFactBudget",
  s.a_dict_value_name_en "aProjectStateNameEN",
  p.is_deleted "isDeleted"
FROM
  projects.e_project p
LEFT JOIN emp.e_emp e ON p.e_project_manager_id = e.id
LEFT JOIN persons.e_person m ON e.e_person_id = m.id
LEFT JOIN documents.e_document pc ON p.e_contract_id = pc.id
LEFT JOIN documents.e_document pp ON p.e_project_plan_id = pp.id
LEFT JOIN customers.e_customer c ON p.e_customer_id = c.id
LEFT JOIN organizations.e_organization o ON c.e_organization_id = o.id
LEFT JOIN dict.e_dict_value k ON p.d_project_kind_id = k.id
LEFT JOIN dict.e_dict_value s ON p.d_project_state_id = s.id;