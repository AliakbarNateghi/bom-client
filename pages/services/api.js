import axios from "axios";
class Api {
  static init() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  static constructUrl(resource, slug = "") {
    return `${resource}/${slug}`;
  }

  static async get(resource, slug) {
    try {
      const response = await axios.get(this.constructUrl(resource, slug));
      console.log("response :", response);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
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

  static async patch(resource, slug, params) {
    try {
      return await axios.patch(this.constructUrl(resource, slug), params);
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
