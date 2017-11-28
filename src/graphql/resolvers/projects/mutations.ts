import { ProjectsService } from './../../../services/projects.service'

const createProject = async (_, data, ctx) => {
  const response = await ProjectsService.createProject(data, ctx.session.user)
  if (response === undefined) return null
  else return Object.assign(response)
}

const updateProject = async (_, data, ctx) => {
  const response = await ProjectsService.updateProject(data, ctx.session.user)
  if (response === undefined) return null
  else return Object.assign(response)
}

const deleteProject = async (_, data, ctx) => {
  const response = await ProjectsService.deleteProject(data, ctx.session.user)
  if (response === undefined) return null
  else return Object.assign(response)
}

export default {
  createProject,
  updateProject,
  deleteProject,
}
