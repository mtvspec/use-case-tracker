import queries from './queries'
const projectsTable: string = 'projects.e_project'
const projectTeamsTable: string = 'projects.e_project_team'
const projectMembersTable: string = 'projects.e_project_member'
const totalCount: string = 'id as totalCount'
import {
  DatabaseService, QueryConfig
} from './../database.service'

import db from './../../knex'

export class ProjectsService extends DatabaseService {
  public static async getProjectsCount () {
    return await db
      .from(projectsTable)
      .count(totalCount).first()
  }
  public static async getProjectTeamsCount (projectID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(pt.id) "totalCount"
      FROM
        projects.e_project_team pt
      INNER JOIN projects.e_project p ON pt."project" = p.id
      AND p.id = ${projectID};`
    }))
  }
  public static async getProjectSystemsCount (projectID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(s.id) "totalCount"
      FROM
        systems.e_system s
      INNER JOIN systems.r_e_project_e_system ps ON ps."system" = s.id
      INNER JOIN projects.e_project p ON ps."project" = p.id
      AND p.id = ${projectID};`
    }))
  }
  public static async getProjectTeamMembersCount (teamID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(pt.id) "totalCount"
      FROM
        projects.e_project_team pt,
        projects.e_project_member pm
      WHERE pm."team" = pt.id
      AND pt.id = ${teamID};`
    }))
  }
  public static async getProjectTeamMembersRolesCount (projectMemberID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(pmr.id) "totalCount"
      FROM
        projects.e_project_member_role pmr,
        projects.e_project_member pm
      WHERE pmr."projectMember" = pm.id
      AND pm.id = ${projectMemberID};`
    }))
  }

  public static async getProjectMemberRoleIssuesCount (projectMemberRoleID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(i.id) "totalCount"
      FROM
        projects.e_project_member_role pmr,
        issues.e_issue i,
        projects.e_project_member pm
      WHERE pmr."projectMember" = pm.id
      AND i."author" = pm.id
      AND i."projectMemberRole" = pmr.id
      AND pmr.id = ${projectMemberRoleID};`
    }))
  }
  public static async getProjectMemberRoleIssues (projectMemberRoleID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        i.*
      FROM
        projects.e_project_member_role pmr,
        issues.e_issue i,
        projects.e_project_member pm
      WHERE pmr."projectMember" = pm.id
      AND i."author" = pm.id
      AND i."projectMemberRole" = pmr.id
      AND i."state" = 136
      AND pmr.id = ${projectMemberRoleID}
      ORDER BY i.title ASC;`
    }))
  }
  public static async getProjectMemberRoles (projectMemberID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        pmr.*
      FROM
        projects.e_project_member_role pmr,
        projects.e_project_member pm,
        dict.e_dict_value v
      WHERE pmr."projectMember" = pm.id
      AND pmr."projectMemberRole" = v.id
      AND pm.id = ${projectMemberID}
      ORDER BY v."nameRu" ASC;`
    }))
  }
  public static async getProjectSystems (projectID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        s.*
      FROM
        systems.e_system s
      INNER JOIN systems.r_e_project_e_system ps ON ps."system" = s.id
      INNER JOIN projects.e_project p ON ps."project" = p.id
      AND p.id = ${projectID};`
    }))
  }
  public static async getProjects () {
    return await db
      .from(projectsTable).orderBy('id')
  }
  public static async getProject (id: number) {
    return await db
      .from(projectsTable)
      .where({ id }).first()
  }
  public static async getProjectTeams (id: number) {
    return await db
      .from(projectsTable)
      .leftOuterJoin(projectTeamsTable, `${projectTeamsTable}.project`, `${projectsTable}.id`)
      .where(`${projectsTable}.id`, id)
  }
  public static async getProjectTeam (id: number) {
    return await db
      .from(projectTeamsTable)
      .where({ id }).first()
  }
  public static async getProjectMembers (teamID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        pm.*
      FROM
        projects.e_project_team pt,
        projects.e_project_member pm,
        persons.e_person p
      WHERE pm."team" = pt.id
      AND pm."person" = p.id
      AND pt.id = ${teamID}
      ORDER BY p."lastName" ASC;`
    }))
  }
  public static async getProjectMembersByPersonID (personID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        pm.*
      FROM
        projects.e_project_team pt,
        projects.e_project_member pm
      WHERE pm."team" = pt.id
      AND pm."person" = ${personID}
      ORDER BY pm.id;`
    }))
  }
  public static async getProjectMember (id: number) {
    return await db
      .from(projectMembersTable)
      .where({ id }).first()
  }
  public static async createProject (data: any, userID) {
    let project = {}
    let errors: Error[] = []
    if (isInvalidString(data.input.projectName, 1, 1000)) {
      return new Error(`field "projectName" is invalid ${data.input.projectName}`)
    }
    const _data = {
      projectName: data.input.projectName,
      projectDescription: data.input.projectDescription,
      officialProjectName: data.input.officialProjectName,
      planStartDate: data.input.planStartDate,
      planEndDate: data.input.planEndDate,
      planBudget: data.input.planBudget,
      factStartDate: data.input.factStartDate,
      factEndDate: data.input.factEndDate,
      factBudget: data.input.factBudget,
      createdBy: userID,
      modifiedBy: userID
    }
    return await db
      .insert(_data).into(projectsTable)
      .returning('*').first()
      .catch(err => { return new Error(err.detail) })
  }
  public static async getProjectByProjectName (projectName: string) {
    return await db
      .from(projectsTable)
      .where('projectName', 'like', `%${projectName}%`)
  }
  public static async updateProject (data: any, userID: number) {
    const _data = {
      projectName: data.input.projectName,
      projectDescription: data.input.projectDescription,
      officialProjectName: data.input.officialProjectName,
      planStartDate: data.input.planStartDate,
      planEndDate: data.input.planEndDate,
      planBudget: data.input.planBudget,
      factStartDate: data.input.factStartDate,
      factEndDate: data.input.factEndDate,
      factBudget: data.input.factBudget,
      updatedBy: userID,
      updatedAt: 'now()',
      modifiedBy: userID
    }
    return await db(projectsTable)
      .update(_data)
      .where({ id: data.id })
      .returning('*').then(rows => { return rows[0] })
      .catch(err => {
        console.trace(err)
        return new Error(err.detail)
      })
  }
  public static async deleteProject (data: any, userID: number) {
    const _data = {
      id: data.id,
      isDeleted: true,
      deletedBy: userID,
      deletedAt: 'now()',
      modifiedBy: userID
    }
    return await db(projectsTable)
      .update(_data).where({ id: _data.id })
      .returning('*').then(rows => { return rows[0] })
      .catch(err => { return new Error(err.detail) })
  }
}

function isNull (data): boolean {
  if (typeof data === undefined || data === null || data === '') return true
  else return false
}

function isInvalidString (data, min, max): boolean {
  if (!data) return true
  if (typeof data !== 'string' && !data.length >= min && !data.length <= max) return true
  else return false
}