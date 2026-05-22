# Plie

React Native CLI app — login, event list, favourites.

## Setup

```bash
npm install
npx react-native run-android
```

## API

Base URL in `.env` and `src/config/env.js`:

```
API_BASE_URL=https://techeruditestaging.com/projects/plie-api/public/api
```

- Login: `POST /login`
- Events: `POST /events-listing` (Bearer token)

## Test account

- Email: `testpracticaluser001@mailinator.com`
- Password: `Test@123`

## App flow

1. Sign In → login API → token saved in Redux → Events screen opens
2. Events tab → loads list from API
3. Tap heart → item appears in Favourites tab
4. Tap heart again → removed from Favourites

## Project structure

```
src/
  api/          API calls + mappers
  store/        Redux (auth, events)
  screens/      Login, Events, Favourites
  components/   Reusable UI
  config/       env values
  assets/fonts/ GothicA1 fonts
```

## Notes for reviewer

- Search and Profile tabs are UI only (not in scope)
- Social login and Guest links are design only
- Event images use placeholders (API images were not loading)
