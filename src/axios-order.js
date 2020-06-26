import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://alirajabib-13818.firebaseio.com/',
});

export default instance;
