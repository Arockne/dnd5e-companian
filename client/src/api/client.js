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

client.get = (endpoint) => {
  return client(endpoint, { method: 'GET' })
}

client.post = (endpoint, body) => {
  return client(endpoint, { body, method: 'POST' })
}

client.patch = (endpoint, body) => {
  return client(endpoint, { body, method: 'PATCH' })
}

client.delete = (endpoint) => {
  return client(endpoint, { method: 'DELETE' })
}
