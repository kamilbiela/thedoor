import axios from 'axios';
import {GetServiceListQueryParams, ServiceListResponse} from 'thedoor-common';

export class ApiService {
  private endpoint: string;

  constructor(endpoint?: string) {
    const v = endpoint || process.env.REACT_APP_BACKEND_ENDPOINT;
    if (!v) {
      throw new Error('No endpoint passed to the ApiService');
    }

    this.endpoint = v;
  }

  async getList(params: GetServiceListQueryParams) {
    const p = {
      ...params
    };

    if (p.filterByName === "") {
      delete p['filterByName'];
    } else {
      p.filterByName = p.filterByName?.trim();
    }

    const response = await axios.get<ServiceListResponse>(`${this.endpoint}/api/services`, {
      params: p
    });

    return response.data;
  }
}

export default new ApiService();
