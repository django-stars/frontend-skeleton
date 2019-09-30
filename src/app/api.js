import API, { QueryParams } from 'ds-api'

const QS = new QueryParams()

const api = new API({
  baseURL: `${window.location.origin}${process.env.API_URL}`,
  queryFuntion: QS.buildQueryParams,
})

export default api
export {
  QS,
}
