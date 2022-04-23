export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()

      console.log(accessToken)

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )

  const interceptor = axios.interceptors.response.use(
    (res: any) => {
      return res
    },
    async (err: any) => {
      const originalConfig = err.config

      if (err.response) {
        // access token expired
        if (err.response.status === 401 && !originalConfig._retry) {
          // handle infinite loop
          originalConfig._retry = true

          const {
            auth: {refreshToken},
          } = store.getState()

          /*
           * When response code is 401, try to refresh the token.
           * Eject the interceptor so it doesn't loop in case
           * token refresh causes the 401 response
           */
          axios.interceptors.response.eject(interceptor)

          try {
            const rs = await axios.post('http://localhost:5000/api/user/refresh_token', {
              refreshToken: refreshToken,
            })

            const {accessToken} = rs.data

            originalConfig.headers.Authorization = `Bearer ${accessToken}`

            console.log('updateNewAccessToken', accessToken)

            return originalConfig
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data)
            }

            return Promise.reject(_error)
          }
        }

        // refresh token expired
      }
      return Promise.reject(err)
    }
  )
}
