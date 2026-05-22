import {API_BASE_URL} from '@env';

export async function apiRequest(path, options = {}) {
  const {token, headers, ...rest} = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...headers,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.message || `Request failed (${response.status})`);
  }

  return json;
}
