/**
 * Metro resolves @env to this file.
 * Values are read from .env when Metro starts.
 */
const API_BASE_URL =
  process.env.API_BASE_URL ||
  'https://techeruditestaging.com/projects/plie-api/public/api';

module.exports = {
  API_BASE_URL,
};
