import axios from '@/utils/axios'

export async function login(email, password) {
  const response = await axios.post('/auth/login', { email, password }, { withCredentials: true })
  return response
}

export async function logout() {
  const response = await axios({
    method: 'post',
    url: '/auth/logout',
    withCredentials: true
  })
  return response
}

export async function refresh() {
  const response = await axios({
    method: 'get',
    url: '/auth/refresh',
    withCredentials: true
  })
  return response
}