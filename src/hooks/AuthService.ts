import axios, { AxiosError } from "axios";

const API_URL = "http://127.0.0.1:8080/api/usuarios";

class AuthService {

  async login(email: string, password: string) {
    const data = JSON.stringify({
      "email": email,
      "password": password
    });
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + '/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    try {
      const response = await axios.request(config)
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError
      if(err.response){
        return (err.response.data as {error : string}).error
      }
      return false;
    }
    
  }

  async restore(token: string, pass: string){
    const data = JSON.stringify({
      token,
      pass
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: API_URL + '/recuperar',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    try {
      const response = await axios.request(config)
      return response.data;
    } catch (error) {
      const err = error as AxiosError
      if(err.response){
        return (err.response.data as {error : string}).error
      }
      return false;
    }
  } 

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

const instanceAuthService = new AuthService();

export default instanceAuthService;