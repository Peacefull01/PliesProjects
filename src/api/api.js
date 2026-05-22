import {apiRequest} from './client';
import {mapApiEventToEvent, mapLoginResponse} from './mappers';

export const loginUser = async credentials => {
  if (!credentials.email.trim() || !credentials.password.trim()) {
    throw new Error('Email and password are required');
  }

  const response = await apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
  });

  if (!response.success || !response.data?.user || !response.data?.token) {
    throw new Error(response.message || 'Login failed');
  }

  return mapLoginResponse(response.data.user, response.data.token);
};

export const fetchEvents = async token => {
  const response = await apiRequest('/events-listing', {
    method: 'POST',
    token,
  });

  if (!response.success || !response.data?.events) {
    throw new Error(response.message || 'Could not load events');
  }

  return response.data.events.map(mapApiEventToEvent);
};
