const debugEnabled: boolean = false
interface debug {
  tables: {
    name: boolean
    fields: boolean
  }
  validateTable: {
    arguments: boolean
  }
  queries: {
    query: boolean
    getNodes: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    getNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    filterNodes: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    searchNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    getNodesCount: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    getEdge: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    getEdges: {
      name: boolean
      arguments: boolean
      response: boolean
    },
    getEdgesCount: {
      name: boolean
      arguments: boolean
      response: boolean
    }
  }
  mutations: {
    createNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    updateNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    deleteNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    restoreNode: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    createEdge: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    updateEdge: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    deleteEdge: {
      name: boolean
      arguments: boolean
      response: boolean
    }
    restoreEdge: {
      name: boolean
      arguments: boolean
      response: boolean
    }
  }
  filters: {
    fieldFilter: {
      arguments: boolean,
      result: boolean
    }
    fieldFilterWithValues: {
      arguments: boolean,
      result: boolean
    }
  }
  argumentsCount: boolean
}


export const debug: debug = {
  tables: {
    name: false,
    fields: false
  },
  validateTable: {
    arguments: false
  },
  queries: {
    query: debugEnabled || false,
    getNodes: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    getNode: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    getNodesCount: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    filterNodes: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    searchNode: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    getEdge: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    getEdges: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    getEdgesCount: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
  },
  mutations: {
    createNode: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    updateNode: {
      name: true,
      arguments: true,
      response: true
    },
    deleteNode: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    restoreNode: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    createEdge: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    updateEdge: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    deleteEdge: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
    restoreEdge: {
      name: debugEnabled || false,
      arguments: debugEnabled || false,
      response: debugEnabled || false
    },
  },
  filters: {
    fieldFilter: {
      arguments: false,
      result: false
    },
    fieldFilterWithValues: {
      arguments: false,
      result: false
    }
  },
  argumentsCount: false
}