export interface NodesQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  search?: string
  fields?: string[]
  except?: { [key: string]: any }
  orderBy?: string[]
}

interface EdgesQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  source: any
  args?: any
}

interface EdgeQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  source: any
  args?: any
}

interface EdgesCountQueryConfig {
  table: string
  tableFields: string[]
  source: { [key: string]: any }
  args?: { [key: string]: any }
  except?: { [key: string]: any }
}

export interface NodeQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  source: { [key: string]: any }
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  except?: { [key: string]: any }
}

interface NodesCountQueryConfig {
  table: string
  tableFields: string[]
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  except?: { [key: string]: any }
  search?: string
  fields?: string[]
}

interface NodeMutationConfig {
  table: string
  tableFields: string[]
  data: { [key: string]: any }
  user: number
}

interface NodeConfig {
  table: string
  tableFields: string[]
  id: number
  user: number
}