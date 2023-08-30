import axios from '@/utils/axios'

export async function articles() {
  const response = await axios.get('/articles')
  return response
}
