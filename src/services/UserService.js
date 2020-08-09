import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/me';
export default class UserService {
  static async login(payload) {
    const { email, password } = payload;
    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      });
      const token = await response.data.token;
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  static async logout() {
    const res = await axios.post();
  }
}
