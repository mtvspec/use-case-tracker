import { ProjectsService } from './../../../services/projects.service'

const createProject = async (root, data, context) => {
  const response = await ProjectsService.createProject(data, context.session.userID)
  if (response === undefined) return null
  else return Object.assign(response)
}

const updateProject = async (root, data, context) => {
  const response = await ProjectsService.updateProject(data, context.session.userID)
  if (response === undefined) return null
  else return Object.assign(response)
}

const deleteProject = async (root, data, context) => {
  const response = await ProjectsService.deleteProject(data, context.session.userID)
  if (response && response.id) return Object.assign(response)
  else return null
}

export default {
  createProject,
  updateProject,
  deleteProject,
}
