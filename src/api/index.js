import http from '@/api/http'

export default {
  auth: {
    login: (data) => http.post('/auth/login', data),
    logout: () => http.post('/auth/logout'),
    register: (data) => http.post('/auth/register', data),
    registerResend: (data) => http.post('/auth/register/resend', data),
    registerVerify: (data) => http.post('/auth/register/verify', data),
    reset: (data) => http.post('/auth/reset', data),
    resetResend: (data) => http.post('/auth/reset/resend', data),
    resetConfirm: (data) => http.post('/auth/reset/confirm', data)
  },
  comments: {
    create: (data) => http.post('/comments', data),
    read: (id) => http.get(`/comments/${id}`),
    modify: (id, data) => http.patch(`/comments/${id}`, data),
    delete: (id) => http.delete(`/comments/${id}`),
    readComments: (id, params) => http.get(`/comments/${id}/comments`, { params: params })
  },
  cuisines: {
    readAll: () => http.get('/cuisines')
  },
  categories: {
    readAll: () => http.get('/categories')
  },
  recipes: {
    readAll: (params) => http.get('/recipes', { params: params }),
    create: (data) => http.post('/recipes', data),
    search: (params) => http.get('/recipes/search', { params: params }),
    read: (id) => http.get(`/recipes/${id}`),
    modify: (id, data) => http.patch(`/recipes/${id}`, data),
    delete: (id) => http.delete(`/recipes/${id}`),
    like: (id) => http.post(`/recipes/${id}/like`),
    favourite: (id) => http.post(`/recipes/${id}/favourite`),
    readComments: (id, params) => http.get(`/recipes/${id}/comments`, { params: params })
  },
  uploads: {
    create: (data) => http.post('/uploads', data),
    read: (id) => http.get(`/uploads/${id}`),
    delete: (id) => http.delete(`/uploads/${id}`)
  },
  users: {
    current: () => http.get('/users/current'),
    search: (params) => http.get('/users/search', { params: params }),
    read: (id) => http.get(`/users/${id}`),
    modify: (id, data) => http.patch(`/users/${id}`, data),
    follow: (id) => http.post(`/users/${id}/follow`),
    readImages: (id, params) => http.get(`/users/${id}/images`, { params: params }),
    readRecommended: (id, params) => http.get(`/users/${id}/recommended`, { params: params }),
    readRecipes: (id, params) => http.get(`/users/${id}/recipes`, { params: params }),
    readFavourites: (id, params) => http.get(`/users/${id}/favourites`, { params: params })
  }
}
