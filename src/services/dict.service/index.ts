import queries from './queries'
import db from './../../knex'
const dictValuesTable: string = 'dict.e_dict_value'
import {
  DatabaseService, QueryConfig
} from './../database.service'
import { field } from '../../utils/index'

let dictTableFields: field[] = []

export class DictService extends DatabaseService {
  public static async getDictValue (fields: field[], id: number) {
    const filterFields = (field: field) => { return (dictTableFields.indexOf(field) > -1) }
    const filteredFields = fields.filter(filterFields)
    return db(dictValuesTable)
      .where({ id })
      .select(filteredFields).first()
  }
  public static async getAllDictValues (dictName: string) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.dict.SELECT_DICT_VALUES_BY_DICT_NAME(dictName)
    }))
  }
}

const getFields = (async () => {
  const response: any = await <any>DictService.fields(dictValuesTable)
  response.forEach((field: any) => dictTableFields.push(field.name))
})()