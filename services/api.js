import axios from "axios";
import { errorToast } from "./toast";
import { useRouter } from "next/router";

class Api {
  static init(cookies) {
    // axios.defaults.baseURL = "http://scopematrix.chikenkillers.com";
    axios.defaults.baseURL =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URI || "http://backend:8000";
    // axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Accept"] = "application/json";
    if (typeof window !== "undefined") {
      // We are on the client
      // No need to set cookies or access token
    } else {
      // We are on the server
      axios.defaults.headers.common["Cookie"] = `access_token=${cookies.get(
        "access_token"
      )}`;
    }
  }

  static constructUrl(resource, slug = "") {
    return `${resource}/${slug}`;
  }

  static async delete(resource, slug) {
    try {
      return await axios.delete(this.constructUrl(resource, slug));
    } catch (err) {
      throw err;
    }
  }

  static async put(resource, slug, params) {
    try {
      return await axios.put(this.constructUrl(resource, slug), params);
    } catch (err) {
      throw err;
    }
  }

  static async get(resource, slug) {
    try {
      const response = await axios.get(this.constructUrl(resource, slug));
      return response;
    } catch (err) {
      throw err;
    }
  }

  static async post(resource, params) {
    try {
      return await axios.post(this.constructUrl(resource), params);
    } catch (err) {
      throw err;
    }
  }

  static async patch(resource, slug, params) {
    try {
      return await axios.patch(this.constructUrl(resource, slug), params);
    } catch (err) {
      throw err;
    }
  }
}

export default Api;
