import http from './httpServices';

// Projects
export function getAllProjects() {
  return http.get(`/project/all`);
}

export function getProject(id) {
  return http.get(`/project/${id}`);
}

export function saveProject(project) {
  if (project._id) {
    const projectClone = {
      ...project,
    };
    delete projectClone._id;
    return http.patch(`/project/${project._id}`, projectClone);
  }
  return http.post(`/project`, project);
}

export function deleteProject(id) {
  return http.delete(`/project/${id}`);
}

// User
export function approveUser(id) {
  return http.patch(`/user/${id}/approve`);
}

export function getUsers() {
  return http.get(`/user/all`);
}

export function deleteUser(id) {
  return http.delete(`/user/${id}`);
}
export function getUser(id) {
  return http.get(`/user/${id}`);
}

// Task
export function postTask(data) {
  return http.post(`/task`, data);
}

export function getTasks(id) {
  return http.get(`/task/${id}`);
}

export function deleteTask(id) {
  return http.delete(`/task/${id}`);
}
export function markDone(id) {
  return http.patch(`/task/${id}/done`);
}
