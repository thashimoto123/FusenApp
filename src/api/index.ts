import { createSubscription, CreateProps, CreateMixin } from '../actioncable';

interface ConnectChannel {
  (roomId: string, userName: string): any
}

export const connectChannelFactory = (createMixin: CreateMixin): ConnectChannel => {
  return (roomId: string, userName: string): any => {
    return createSubscription({roomId, userName}, createMixin);
  }
}

export const getLoggedinStatus = async (roomId: string) => {
  let status: 'LOGGEDIN' | 'NOT_LOGGEDIN' | 'NOT_EXIST' = 'NOT_EXIST';
  await fetchApi('GET', null, roomId)
    .then((res: any) => {
      status = res.status ?? 'NOT_EXIST';
    });
  return status;
}

export const login = (roomId: string, password: string) => {
  return fetchApi('POST', {roomId, password}, 'login')
    .then((res:any) => {
      return res.status ?? 'NG';
    })
}

interface CreateParams {
  roomId: string;
  password: string;
  password_confirmation: string;
  cards: any;
  colors: any;
  labels: any;
}

export const create = (params: CreateParams): any => {
  return fetchApi('POST', params);
}


interface UpdateParams {
  cards?: any;
  colors?: any;
  labels?: any;
}
export const update = (roomId: string, params: UpdateParams): any => {
  return fetchApi('PUT', params, roomId);
}

const API_URL = '/api/rooms/';
type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CREATE';
export const fetchApi = (method: MethodType = 'GET', data: any = null, url:string = '') => {
  const body = data ? JSON.stringify(data) : null;
  const meta = document.querySelector('meta[name="csrf-token"]');
  const token = meta?.getAttribute('content') ?? '';
  return fetch(API_URL + url , {
    method,
    headers: {'Accept': 'application/json','Content-Type': 'application/json', 'X-CSRF-Token': token},
    body,
    // mode: 'cors',
    // credentials: 'include'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      alert('エラーが起きました。');
      throw new Error('Network response was not ok.');
    })
    .catch(err => {
      console.error(err.message);
    }) 
};