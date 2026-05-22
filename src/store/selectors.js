// Favourite events from Redux store
export const selectFavoriteEvents = state =>
  state.events.list.filter(event => event.isFavorite);
