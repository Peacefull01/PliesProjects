import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AppText from './AppText';
import {colors} from '../constants/colors';
import EventCard from './EventCard';

const EventList = ({
  events,
  onToggleFavorite,
  emptyMessage = 'No events found',
}) => {
  const renderItem = useCallback(
    ({item}) => (
      <EventCard event={item} onToggleFavorite={onToggleFavorite} />
    ),
    [onToggleFavorite],
  );

  const keyExtractor = useCallback(item => item.id, []);

  if (events.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <AppText style={styles.emptyText} weight="regular">
          {emptyMessage}
        </AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textGray,
    fontSize: 14,
  },
});

export default EventList;
