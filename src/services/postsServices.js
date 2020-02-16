import http from "./httpServices"
import {
    apiUrl
} from "../config.json"


// Projects
export function getAllProjects() {
    return http.get(`${apiUrl}/project/all`)
}

export function getProject(id) {
    return http.get(`${apiUrl}/project/${id}`)
}

export function saveProject(project) {
    if (project._id) {
        const projectClone = {
            ...project
        }
        delete projectClone._id
        return http.patch(`${apiUrl}/project/${project._id}`, projectClone)
    }
    return http.post(`${apiUrl}/project`, project)
}

export function deleteProject(id) {
    return http.delete(`${apiUrl}/project/${id}`)
}

// User
export function approveUser(id) {
    return http.patch(`${apiUrl}/user/${id}/approve`)
}

export function getUsers() {
    return http.get(`${apiUrl}/user/all`)
}




// Task
export function postTask(data) {
    return http.post(`${apiUrl}/task`, data)
}

export function getTasks(id) {
    return http.get(`${apiUrl}/task/${id}`)
}

export function deleteTask(id) {
    return http.delete(`${apiUrl}/task/${id}`)
}
export function markDone(id) {
    return http.patch(`${apiUrl}/task/${id}/done`)
}


// COMMENT
export function articleComment(id, data) {
    return http.post(`${apiUrl}articles/${id}/comment`, data)
}

export function gifComment(id, data) {
    return http.post(`${apiUrl}gifs/${id}/comment`, data)
}