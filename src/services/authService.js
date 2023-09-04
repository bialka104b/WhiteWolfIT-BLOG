import axios from '@/utils/axios'

export async function login(email, password) {
  const response = await axios.post('/auth/login', { email, password }, { withCredentials: true })
  console.log(response)
  return response
}

export async function refresh() {
  const response = await axios.post('/auth/refresh')
  console.log(response)
  return response
}
