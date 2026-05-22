import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventList from '../components/EventList';
import {colors} from '../constants/colors';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {selectFavoriteEvents} from '../store/selectors';
import {toggleFavorite} from '../store/slices/eventsSlice';

const FavouritesScreen = () => {
  const dispatch = useAppDispatch();
  const favoriteEvents = useAppSelector(selectFavoriteEvents);
  const userName = useAppSelector(state => state.auth.user?.name ?? 'Guest');

  const title = useMemo(() => `Hello ${userName}!`, [userName]);

  const handleToggleFavorite = useCallback(
    eventId => {
      dispatch(toggleFavorite(eventId));
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{title}</Text>
        <Text style={styles.subtitle}>Your favourite events</Text>
      </View>

      <EventList
        events={favoriteEvents}
        onToggleFavorite={handleToggleFavorite}
        emptyMessage="No favourites yet. Tap the heart on any event to save it here."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textGray,
    marginTop: 4,
  },
});

export default FavouritesScreen;
