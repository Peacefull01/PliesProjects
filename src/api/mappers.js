// API images were broken in testing, using placeholders
const PLACEHOLDER_IMAGES = [
  'https://picsum.photos/seed/plie-event-1/160/160',
  'https://picsum.photos/seed/plie-event-2/160/160',
  'https://picsum.photos/seed/plie-event-3/160/160',
  'https://picsum.photos/seed/plie-event-4/160/160',
];

const getPlaceholderImage = index =>
  PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];

const parseKeywords = keywords => {
  if (Array.isArray(keywords)) {
    return keywords;
  }
  if (typeof keywords === 'string') {
    return keywords.split(/\s+/).filter(Boolean);
  }
  return [];
};

const parseDanceStyles = danceStyles => {
  if (Array.isArray(danceStyles)) {
    return danceStyles.map(style => style.ds_name);
  }
  return [];
};

const buildTags = item => {
  const combined = [
    ...parseKeywords(item.keywords),
    ...parseDanceStyles(item.danceStyles),
  ];
  return [...new Set(combined)];
};

const formatPrice = (from, to) => {
  if (from === 0 && to === 0) {
    return 'Free';
  }
  return `€${from} – €${to}`;
};

const formatDate = (from, to) => {
  if (to && to.trim().length > 0) {
    return `${from} – ${to}`;
  }
  return from;
};

export const mapApiUserToUser = apiUser => ({
  id: apiUser.usr_id,
  name: `${apiUser.usr_fname} ${apiUser.usr_lname}`.trim(),
  email: apiUser.usr_email,
});

export const mapLoginResponse = (apiUser, token) => ({
  user: mapApiUserToUser(apiUser),
  token,
});

export const mapApiEventToEvent = (item, index) => ({
  id: String(item.event_date_id),
  title: item.event_name,
  date: formatDate(item.readable_from_date, item.readable_to_date),
  price: formatPrice(item.event_price_from, item.event_price_to),
  location: `${item.city}, ${item.country}`,
  tags: buildTags(item),
  imageUrl: getPlaceholderImage(index),
  isFavorite: item.isFavorite === 1,
});
