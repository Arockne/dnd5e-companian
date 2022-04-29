export function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'content-type': 'application/json' }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return fetch(endpoint, config)
}
