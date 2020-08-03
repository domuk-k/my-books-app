import React from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';

import BookCard from '../components/BookCard';
import Headers from '../components/Headers';
import BookListGrid from '../components/BookListGrid';
import BookSearchInput from '../components/BookSearchInput';
import WidthContext from '../components/WidthContext';

class Home extends React.Component {
  state = {
    books: [],
    loading: false,
    error: null,
    input: '',
    current: [],
    width: window.innerWidth,
  };
  // goUrl = useCallback(
  //   () => {},
  //   [input],
  // )
  handleChange = e => {
    const input = e.target.value;
    this.setState({
      input,
      current: this.state.books.filter(book =>
        book.title.match(new RegExp(input, 'ig')),
      ),
    });
  };
  render() {
    const { loading, error, current, input, width } = this.state;
    const padding_home = {
      paddingTop: 30,
      paddingLeft: width / 12,
      paddingRight: width / 12,
    };

    return (
      <div style={padding_home}>
        <Headers />
        {loading && <h3>로딩 중...</h3>}
        {error && <h3>에러다!!!</h3>}
        <BookSearchInput
          type="text"
          placeholder="Search for books"
          value={input}
          onChange={this.handleChange}
        />
        <WidthContext.Provider value={width}>
          <BookListGrid>
            {error === null &&
              current.map(book => (
                <li key={book.bookId} id={book.bookId}>
                  <BookCard book={book} />
                </li>
              ))}
          </BookListGrid>
        </WidthContext.Provider>
      </div>
    );
  }

  async componentDidMount() {
    console.log('Home componentDidMount');
    window.addEventListener('resize', this.handleResize);

    this.setState({
      loading: true,
      error: null,
    });
    try {
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const books = response.data;
      this.setState({ books, loading: false, error: null, current: books });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
      console.log(error);
    }
  }

  componentWillMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
    });
  };
}

export default React.memo(withAuth(Home));

// function sleep(ms) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// }
