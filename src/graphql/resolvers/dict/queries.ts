import CommonResolvers from './../common'

import { DictService } from './../../../services'

const getDictValue = async (source: any, args: any, ctx: any, info: any) => {
  const unfilteredFields = Object.keys(ctx.utils.parseFields(info))
  return await DictService.getAllDictValues(unfilteredFields, source.args.dictName)
}

const DictConnection = {
  dictValues: getDictValue
}

const DictValue = {
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  DictConnection,
  DictValue
}