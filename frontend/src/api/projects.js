import api from './axios'

export const fetchProjects = () => {

    return api.get('/projects')

}

export const createProject = (data) => {

    return api.post('/projects', data)

}

export const deleteProject = (projectId) => {


    return api.delete(`/projects/${projectId}`)
}

export const assignClient = (projectId, clientIds) => {

    return api.put(`/projects/${projectId}/assign-client`, {clientIds})
}

export const updateProjectStatus = (projectId, status) => {

    return api.patch(`/projects/${projectId}/status`, {status})
}