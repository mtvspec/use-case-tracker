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

export interface EdgesQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  source: any
  args?: any
}

export interface EdgeQueryConfig {
  table: string
  tableFields: string[]
  unfilteredFields: string[]
  source: any
  args?: any
}

export interface EdgesCountQueryConfig {
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

export interface NodesCountQueryConfig {
  table: string
  tableFields: string[]
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  search?: string
  fields?: string[]
  except?: { [key: string]: any }
}

export interface CreateNodeMutationConfig {
  table: string
  tableFields: string[]
  data: { [key: string]: any }
  user: number
}

export interface UpdateNodeMutationConfig {
  table: string
  tableFields: string[]
  target: { [key: string]: any }
  data: { [key: string]: any }
  user: number
}

export interface NodeConfig {
  table: string
  tableFields: string[]
  id: number
  user: number
}