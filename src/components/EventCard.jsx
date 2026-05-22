import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import Icon from './Icon';
import {colors} from '../constants/colors';
import {cardShadow} from '../utils/shadow';
import Tag from './Tag';

const EventCard = ({event, onToggleFavorite}) => {
  const handleFavorite = useCallback(() => {
    onToggleFavorite(event.id);
  }, [event.id, onToggleFavorite]);

  return (
    <TouchableOpacity style={[styles.card, cardShadow]} activeOpacity={0.9}>
      <Image source={{uri: event.imageUrl}} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <AppText style={styles.title} weight="bold" numberOfLines={1}>
            {event.title}
          </AppText>
          <Icon name="chevron-forward" size={18} color={colors.textLight} />
        </View>

        <View style={styles.metaRow}>
          <AppText style={styles.date} weight="medium">
            {event.date}
          </AppText>
          <AppText style={styles.location} weight="regular">
            {event.location}
          </AppText>
        </View>

        <AppText style={styles.price} weight="regular">
          {event.price}
        </AppText>

        <View style={styles.bottomRow}>
          <View style={styles.tags}>
            {event.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} hitSlop={8}>
              <Icon name="share-outline" size={18} color={colors.textGray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleFavorite}
              hitSlop={8}>
              <Icon
                name={event.isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={event.isFavorite ? colors.primary : colors.textGray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.tagBg,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: colors.black,
    marginRight: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: colors.dateGreen,
  },
  location: {
    fontSize: 11,
    color: colors.textGray,
  },
  price: {
    fontSize: 11,
    color: colors.textGray,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginLeft: 10,
  },
});

export default EventCard;
