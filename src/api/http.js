import axios from 'axios'
import config from '@/config'

const http = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
})

export default http
