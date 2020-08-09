import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/me';
export default class UserService {
  static async login(email, password) {
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

  static async logout(token) {
    await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
