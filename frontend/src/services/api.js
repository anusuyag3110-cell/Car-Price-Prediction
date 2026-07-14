import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000' })

export async function getBrands(){
  const r = await API.get('/brands')
  return r.data.brands
}
export async function getModels(brand){
  const r = await API.get(`/models/${brand}`)
  return r.data.models
}
export async function predict(payload){
  const r = await API.post('/predict', payload)
  return r.data
}

export default API
