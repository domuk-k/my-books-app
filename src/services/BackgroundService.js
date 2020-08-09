import axios from 'axios';

const baseURL = 'https://api.unsplash.com';
const url = '/photos/random';
const client_id = '4UbjQ1m5GxGd3iH7DXW8KCUp_lF1C-k-bpOYwvNYj8k';
const params = {
  content_filter: 'high',
  featured: true,
  orientation: 'portrait',
  query: 'wallpaper',
  client_id,
};

const options = {
  method: 'GET',
  baseURL,
  url,
  params,
};

export default class {
  static async getSource() {
    const res = await axios(options);
    const data = await res.data;
    return data.urls.regular;
  }
}
