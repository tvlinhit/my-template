import { HttpClient } from 'api/http/HttpClient';

class BaseApi extends HttpClient {
  constructor() {
    super({ baseURL: process.env.REACT_APP_BASE_API || '/' });
  }
}
const apiClient = new BaseApi();
export default apiClient;
