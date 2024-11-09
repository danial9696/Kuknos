import defaultAxios, { AxiosError, AxiosResponse } from "axios"

const axios = defaultAxios.create()

//All request will wait 2 seconds before timeout
axios.defaults.timeout = 60000

axios.defaults.withCredentials = true

// Add a response interceptor
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (process.env.NODE_ENV === "development") {
      console.error("Axios error => ", error)
    }
    return Promise.reject(error)
  }
)

export default axios
