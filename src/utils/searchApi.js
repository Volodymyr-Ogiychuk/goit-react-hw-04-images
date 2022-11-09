import axios from "axios";

const API_KEY = "30367139-d29baca05590c92d76f2ea65a";

const searchApi = (queryValue, page = 1) => {
  return axios
    .get(`https://pixabay.com/api/?key=${API_KEY}&q=${queryValue}&image_type=photo`, {
      params: {
        q: queryValue,
        apiKey: API_KEY,
        per_page: 12,
        page,
      },
    })
    .then((res) => res.data);
};

export default searchApi;