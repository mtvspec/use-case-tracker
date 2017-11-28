import { DatabaseService, ServiceConfig } from './../database.service'
import { NodeConfig, NodesCountConfig, NodesConfig } from '../interfaces';
import { NodeQueryConfig } from '../database.service/interfaces';
export class UsersService extends DatabaseService {
  public static UserConfig: ServiceConfig = {
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
}

const us = new UsersService()