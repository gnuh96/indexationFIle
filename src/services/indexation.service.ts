import instance from '../helpers/axios.instance'

const getAllIndex = async () => {
  const response = await instance.get(`/api/indexations`)
  return response.data
}

const getAllIndexByWord = async (mot: string) => {
  const response = await instance.get(`/api/indexations`, {
    params: {mot},
  })
  return response.data
}

const getAllIndexByDoc = async (doc: string) => {
  const response = await instance.get(`/api/indexations`, {
    params: {doc},
  })
  return response.data
}

const deleteAllIndex = async () => {
  const response = await instance.delete(`/api/indexations`)
  return response.data
}

const addIndex = async (body: any) => {
  const response = await instance.post(`/api/indexations`, body)
  return response.data
}
const IndexationService = {
  getAllIndex,
  getAllIndexByWord,
  deleteAllIndex,
  addIndex,
  getAllIndexByDoc,
}

export default IndexationService
