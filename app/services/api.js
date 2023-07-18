import axios from 'axios';
class Api {
  
  static init() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  static constructUrl(resource, slug = '') {
    return `${resource}/${slug}`;
  }

  static async post(resource, params) {
    try {
      return await axios.post(this.constructUrl(resource), params);
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  static async put(resource, slug, params) {
    try {
      return await axios.put(this.constructUrl(resource, slug), params);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async get(resource, slug, params) {
    try {
      return await axios.get(this.constructUrl(resource, slug, {
        params,
        withCredentials: true,
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async delete(resource, params) {
    try {
      return await axios.delete(this.constructUrl(resource), params);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default Api;

