import { API } from '@ds-frontend/api'
import { QueryParams } from '@ds-frontend/queryParams'

export const QS = new QueryParams()

const api = new API({
  baseURL: `${process.env.API_URL}`,
  queryFuntion: QS.buildQueryParams,
})

export default api
