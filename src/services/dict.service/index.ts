import { DatabaseService, QueryConfig, ServiceConfig } from './../database.service'
import { NodeConfig, NodesConfig } from '../interfaces';
const DICT_TABLE: string = 'dict.e_dict'
const DICT_VALUES_TABLE: string = 'dict.e_dict_value'
let dictValueTableFields: string[] = []

export class DictService extends DatabaseService {
  public static DictValuesConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  constructor() {
    super()
    async function getDictValuesTableFields (table) {
      DictService.DictValuesConfig.table = table
      const response: any = await <any>DictService.fields(table)
      if (response && response.length > 0) DictService.DictValuesConfig.tableFields = response
      else console.trace(response)
    }
    getDictValuesTableFields('dict.e_dict_value')
  }
  public static async getDictValue (config: NodeConfig) {
    return this.getNode(Object.assign({}, DictService.DictValuesConfig, config))
  }
  public static async getAllDictValues (config: NodesConfig) {
    console.log(config);

    const requestedFields: string = this.buildFieldSet(this.filterFields(DictService.DictValuesConfig.tableFields, config.unfilteredFields), 'v')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${DICT_VALUES_TABLE} v,
        ${DICT_TABLE} d
      WHERE v.dict = d.id
      AND d."systemName" = '${config.source['dictName']}'
      ORDER BY v.id ASC;
      
      `
    }))
  }
}

const ds = new DictService()