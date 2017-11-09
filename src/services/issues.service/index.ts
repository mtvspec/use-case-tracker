import { convertData } from './../../utils'
import {
  DatabaseService, QueryConfig
} from './../database.service'
import queries from './queries'
export class IssuesService extends DatabaseService {
  public static async getIssuesCount () {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.GET_ISSUES_COUNT()
    }))
  }
  public static async getIssues () {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.issues.GET_ISSUES()
    }))
  }
  public static async filterIssues (filter: any) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.issues.FILTER_ISSUES(filter)
    }))
  }
  public static async getIssuesByFieldValue (data: any) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.issues.GET_ISSUES_BY_COLUMN_NAME(data)
    }))
  }
  public static async getIssue (id: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.GET_ISSUE(id)
    }))
  }
  public static async createIssue (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.INSERT_ISSUE(data)
    }))
  }
  public static async updateIssue (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.UPDATE_ISSUE(data)
    }))
  }
  public static async openIssue (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.OPEN_ISSUE(data)
    }))
  }
  public static async closeIssue (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.CLOSE_ISSUE(data)
    }))
  }
  public static async deleteIssue (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.issues.DELETE_ISSUE(data)
    }))
  }
}