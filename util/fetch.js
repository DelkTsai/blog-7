/**
 * Created by zhangran on 16/10/17.
 */

// import {browserHistory} from 'react-router'

module.exports = function (url, fetchConfig) {
  const config = {
    credentials: 'include'
  }
  var fetchPromise
  var body, query, _query

  if (/post|put/i.test(fetchConfig.method)) {
    body = fetchConfig.body
    if (typeof body === 'object') {
      fetchConfig.body = Object.keys(body).map(key => `${key}=${body[key]}`).join('&')
    }
  } else {
    query = fetchConfig.query
    if (typeof query === 'object') {
      _query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
      if (url.indexOf('?') !== -1) {
        url += '&' + _query
      } else {
        url += '?' + _query
      }
    }
  }

  fetchPromise = fetch(url, {
    ...config,
    ...fetchConfig
  }).then(
    response => {
      if (response.ok) {
        return response.json()
      }

      throw response
    }
  )

  fetchPromise.catch(e => {
    // 程序内部错误
    if (e instanceof Response) {
      switch (e.status) {
        case 401:
          // browserHistory.push('/login')
          break
        case 500:
          break
      }
    } else {
    }
  })

  return fetchPromise
}
