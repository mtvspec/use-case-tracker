import { DatabaseService, ServiceConfig } from './../database.service'
import { NodeConfig, NodesCountConfig, NodesConfig } from '../interfaces';
import { NodeQueryConfig } from '../database.service/interfaces';
export class UsersService extends DatabaseService {
  public static UserConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  public static RoleConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  public static UserRolesConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  constructor() {
    super()
    async function getUserTableFields (table: string) {
      UsersService.UserConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) UsersService.UserConfig.tableFields = response
      else console.trace(response)
    }
    getUserTableFields('users.e_user')
    async function getRoleTableFields (table: string) {
      UsersService.RoleConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) UsersService.RoleConfig.tableFields = response
      else console.trace(response)
    }
    getRoleTableFields('users.e_role')
    async function getUserRolesEdgesTableFields (table: string) {
      UsersService.UserRolesConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) UsersService.UserRolesConfig.tableFields = response
      else console.trace(response)
    }
    getUserRolesEdgesTableFields('users.r_e_user_e_role')
  }
  public static async getUsersCount (config: NodesCountConfig) {
    return this.getNodesCount(Object.assign({}, UsersService.UserConfig, config))
  }
  public static getAllUsers (config: NodesConfig) {
    return this.getNodes(Object.assign({}, UsersService.UserConfig, config))
  }
  public static async getUser (config: NodeConfig) {
    return this.getNode(Object.assign({}, UsersService.UserConfig, config))
  }
  public static async getUserPasswordByUsername (config: NodeQueryConfig) {
    return this.getNode(Object.assign({}, UsersService.UserConfig, config))
  }
  public static getRoles (config: NodesConfig) {
    return this.getNodes(Object.assign({}, UsersService.RoleConfig, config))
  }
  public static getUserRolesEdges (config: NodesConfig) {
    return this.getNodes(Object.assign({}, UsersService.UserRolesConfig, config))
  }
  public static getRole (config: NodeConfig) {
    return this.getNode(Object.assign({}, UsersService.RoleConfig, config))
  }
}

const us = new UsersService()