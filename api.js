const axios = require('axios')

axios.interceptors.request.use(config => {
  config.headers['Authentication'] = process.env.NEXT_PUBLIC_API_KEY;
  return config;
})

const BASE_URL = process.env.NEXT_PUBLIC_API;

exports.getBooks = () => {
  return axios.get(BASE_URL + '/books')
    .then(res => {
      return res.data.data;
    })
}

exports.getBook = (slug) => {
  return axios.get(BASE_URL + '/books/' + slug);
}

const getSummary = (slug) => {
  return axios.get(BASE_URL + '/summary/' + slug + '/getFull');
}

exports.getChapters = async (slug) => {
  return getSummary(slug)
    .then(res => {
      if (res.data.data) {
        return res.data.data;
      }
    })
}