import http from './httpServices';
import { apiUrl } from '../config.json';
import decode from 'jwt-decode';

const jwtToken = 'token';

export function getCurrentUser() {
  try {
    const user = decode(localStorage.getItem(jwtToken));
    return user;
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(token) {
  localStorage.setItem(jwtToken, token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

function getUrl(endpoint) {
  return `/user/${endpoint}`;
}

export async function login(data) {
  return await http.post(getUrl('login'), data);
}

export async function register(data) {
  return await http.post(getUrl('register'), data);
}

export function getJwt() {
  return localStorage.getItem('token');
}

export default {
  login,
  register,
  loginWithJwt,
  getCurrentUser,
};
