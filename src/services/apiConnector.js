import axios from "axios"

// ✅ Always send cookies with requests
export const axiosInstance = axios.create({
  withCredentials: true, // 🔥 CRITICAL LINE
  timeout: 10000, // 10 second timeout
})

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
  })
}
