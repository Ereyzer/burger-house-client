import axios from 'axios';
import type { Order } from '../pages/orderPlace/interfaces';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: 'http://192.168.0.106:3000',
  // baseURL: 'http://192.168.217.165:3000',
  // baseURL: 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': true },
});
class ApiService {
  constructor() {}

  getMenu = async ({
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

  getMenuItem = async (id: string) => {
    return instance
      .get(`/client/menu/${id}`)
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
  };

  getAboutInfo = async () =>
    instance
      .get('/client/about')
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });

  getTotalPrice = async (
    items: { id: string; quantity: number }[],
    isDelivery: boolean,
    address?: string,
    secretToken?: string,
    distance?: number,
  ) =>
    instance
      .post('/client/newOrder/totalPrice', { items, isDelivery, distance, address, secretToken })
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });

  createNewOrder = async (order: Order) =>
    instance
      .post('/client/neworder', order)
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });

  autocompleteStreet = async (q: string, st: string) =>
    instance
      .get('/client/street/autocomplete', {
        params: {
          q,
          st,
        },
      })
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
  getDistance = async (address: string, secretToken: string) =>
    instance
      .post('/client/distance', { street: address.split(' ').join('%20'), secretToken })
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
}

export const apiService = new ApiService();
