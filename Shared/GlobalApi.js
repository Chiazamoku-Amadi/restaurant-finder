// For keeping all API calls

const { default: axios } = require("axios");

// To get the location of restaurants that match the search params
const getGooglePlace = (category, radius, lat, lng) =>
  axios.get(
    `/api/google-place?category=${category}&radius=${radius}&lat=${lat}&lng=${lng}`
  );

export default { getGooglePlace };
