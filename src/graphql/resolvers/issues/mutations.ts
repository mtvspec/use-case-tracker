import { IssuesService } from './../../../services/issues.service'

const createIssue = async (root, data, context) => {
  const _data = {
    authorID: data.input.authorID,
    issueTypeID: data.input.issueTypeID,
    title: data.input.title,
    description: data.input.description,
    stateID: data.input.stateID,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>IssuesService.createIssue(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const updateIssue = async (root, data, context) => {
  const _data = {
    id: data.id,
    authorID: data.input.authorID,
    typeID: data.input.issueTypeID,
    title: data.input.title,
    description: data.input.description,
    stateID: data.input.stateID,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>IssuesService.updateIssue(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const deleteIssue = async (root, data, context) => {
  const _data = {
    id: data.id,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>IssuesService.deleteIssue(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const openIssue = async (root, data, context) => {
  const _data = {
    id: data.id,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>IssuesService.openIssue(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const closeIssue = async (root, data, context) => {
  const _data = {
    id: data.id,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>IssuesService.closeIssue(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

export default {
  createIssue,
  updateIssue,
  deleteIssue,
  openIssue,
  closeIssue
}