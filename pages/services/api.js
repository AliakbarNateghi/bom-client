import axios from "axios";

class Api {
  static init(cookies) {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Accept"] = "application/json";
    // axios.defaults.headers.common["Cookie"] = `access_token=${cookies.get(
    //   "access_token"
    // )}`;
    if (typeof window !== "undefined") {
      // We are on the server
      // No need to set cookies or access token
    } else {
      // We are on the client
      axios.defaults.headers.common["Cookie"] = `access_token=${cookies.get(
        "access_token"
      )}`;
    }
  }

  static constructUrl(resource, slug = "") {
    return `${resource}/${slug}`;
  }

  static async get(resource, slug) {
    // console.log("shitttttttttttttttttttttttttttttttttttttttttt");
    try {
      const response = await axios.get(this.constructUrl(resource, slug));
      console.log("response-test :", response);
      return response;
    } catch (err) {
      console.log("err-test :", err);
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
