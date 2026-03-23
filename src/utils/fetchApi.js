/**
 * Utility function for API requests with Axios and error handling.
 * @param {string} url - The API endpoint URL.
 * @param {Object} [config={}] - Axios config (method, headers, params, data, etc.).
 * @returns {Promise<{data: any|null, error: string|null}>} Response data or error.
 */
import axios from "axios";

export const fetchApi = async (url, config = {}) => {
  try {
    const { data } = await axios(url, config);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export default fetchApi;
