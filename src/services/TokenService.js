const LOCALSTORAGE_KEY = 'token';
export default class TokenService {
  static setToken(token) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }
  static getToken() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }
}
