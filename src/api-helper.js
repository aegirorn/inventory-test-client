import Axios from "axios";

export default function ApiHelper() {
  this.baseURL = process.env.REACT_APP_API_HOST;

  this.login = async function (username, password) {
    try {
      var querystring = require('querystring');

      const response = await Axios.post(this.baseURL + "token",
      querystring.stringify({
        username: username,
        password: password
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      return response.data.access_token;

    } catch (error) {
      console.log('An Error occurred :(');
      console.log(error.response);
      return error.response;
    }
  };

  this.register = async function (username, password, email) {
    try {
      await Axios.post(this.baseURL + "users",
      {
        username: username,
        password: password,
        email: email
      });

      return this.login(username, password);

    } catch (error) {
      console.log('An Error occurred :(');
      console.log(error.response);
      return error.response;
    }
  };


  this.getInventory = async function () {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const token = storedData.token;

    if (!token) {
      console.log('Authentication error: User is not logged in!');
      return;
    }
    
    try {
      
      const URL = this.baseURL + "inventory";
      const response = await Axios.get(URL, {
        headers: {"Authorization" : `Bearer ${token}`}
      });

      return response.data;

    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };
}
