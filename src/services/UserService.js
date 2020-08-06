import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/me';
export default class UserService {
  static async login(email, password) {
    const response = await axios.post(API_URL, {
      email,
      password,
    });
    return response.data.token;
  }
}
