import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://192.168.0.106:3000',
  headers: { 'Access-Control-Allow-Origin': true },
});
class ApiService {
  constructor() {}

  getMenu = ({
    page,
    perPage,
    category,
  }: {
    page?: number;
    perPage?: number;
    category?: string;
  }) => {
    let url = '/client/menu';
    if (page || perPage || category) {
      url = url + '?';
      let isValue = false;
      if (page) {
        url = url + 'page=' + page;
        isValue = true;
      }
      if (perPage) {
        url = isValue ? url + '&' + 'perPage=' + perPage : url + 'perPage=' + perPage;
        isValue = true;
      }
      if (category)
        url = isValue ? url + '&' + 'category=' + category : url + 'category=' + category;
    }
    return instance
      .get(url)
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
  };
}

export const apiService = new ApiService();
