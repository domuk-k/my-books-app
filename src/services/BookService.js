import axios from 'axios';
import qs from 'qs';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';

export default class BookService {
  static async getBooks(token) {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  }
  static async getBookCovers(books) {
    const covers = [];
    const KAKAO_BOOK_APP_KEY = `6ca57f1a12aa1279e34bf0775176aba4`;
    for (let i = 0; i < books.length; i++) {
      const query = { query: books[i].title };
      const url = `https://dapi.kakao.com/v3/search/book?target=title&size=1&${qs.stringify(
        query,
      )}`;
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `KakaoAK ${KAKAO_BOOK_APP_KEY}`,
        },
        url,
      };
      const response = await axios(requestOptions);
      covers.push(response.data.documents[0]);
    }

    return covers;
  }

  static async addBook(token, book) {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async editBook(token, bookId, book) {
    const response = await axios.patch(
      `${BOOK_API_URL}/${bookId}`,
      book,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
  static async deleteBook(token, bookId) {
    await axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
