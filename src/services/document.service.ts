import instance from '../helpers/axios.instance'

const getAllDoc = async () => {
  const response = await instance.get(`/api/documents`)
  return response.data
}

const getDocByName = async (name: any) => {
  const response = await instance.get(`/api/documents/${name}`)
  return response.data
}

const addDoc = async (body: any) => {
  const response = await instance.post(`/api/documents`, body)
  return response.data
}

const DocumentService = {
  getAllDoc,
  addDoc,
  getDocByName,
}

export default DocumentService
