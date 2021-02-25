let axios = require("axios");

module.exports = axios.create({
  baseURL: "https://api.covid19db.net", // set to http://localhost:5000 for local development
  // https://api.covid19db.net
});
