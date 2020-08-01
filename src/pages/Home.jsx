import React, { Component } from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';

class Home extends Component {
  state = {
    books: [],
    loading: false,
    error: null,
  };
  render() {
    return (
      <div>
        <h1>Home</h1>

        {this.state.books.map(book => (
          <li>{book.title}</li>
        ))}
      </div>
    );
  }

  async componentDidMount() {
    // 로딩 시작
    this.setState({
      loading: true,
    });
    try {
      await sleep(2000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      console.log(response.data);
      const book = response.data;
      this.setState({ book, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }
}

export default withAuth(Home, true);

function sleep(ms) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
