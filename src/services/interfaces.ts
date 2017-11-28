export interface NodesConfig {
  unfilteredFields: string[]
  source?: { [key: string]: any }
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  search?: string
  except?: { [key: string]: any }
  orderBy?: string[]
}
export interface NodeConfig {
  unfilteredFields: string[]
  source: { [key: string]: any }
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  except?: { [key: string]: any }
}

export interface NodesCountConfig {
  args?: { [key: string]: any }
  filter?: { [key: string]: any }
  search?: string
  except?: { [key: string]: any }
}

export interface EdgesConfig {
  unfilteredFields: string[]
  source: { [key: string]: any }
  args?: { [key: string]: any }
}

export interface EdgesCountConfig {
  source: { [key: string]: any }
  args?: { [key: string]: any }
  except?: { [key: string]: any }
}