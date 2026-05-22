import {API_BASE_URL} from '../config/env';

const getFullUrl = path => {
  const base = API_BASE_URL.replace(/\/$/, '');
  const route = path.startsWith('/') ? path : `/${path}`;
  return `${base}${route}`;
};

export async function apiRequest(path, options = {}) {
  const {token, headers, ...rest} = options;

  const response = await fetch(getFullUrl(path), {
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

  if (json.success === false) {
    throw new Error(json.message || 'Request failed');
  }

  return json;
}
