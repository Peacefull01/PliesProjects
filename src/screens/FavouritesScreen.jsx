import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import EventList from '../components/EventList';
import {colors} from '../constants/colors';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {toggleFavorite} from '../store/slices/eventsSlice';

const FavouritesScreen = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(state => state.events.list);
  const userName = useAppSelector(state => state.auth.user?.name ?? 'Guest');

  const favoriteEvents = useMemo(
    () => events.filter(event => event.isFavorite),
    [events],
  );

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
        <AppText style={styles.greeting} weight="bold">
          {title}
        </AppText>
        <AppText style={styles.subtitle} weight="regular">
          Your favourite events
        </AppText>
      </View>

      <EventList
        events={favoriteEvents}
        onToggleFavorite={handleToggleFavorite}
        emptyMessage="No favourites yet"
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
    color: colors.black,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textGray,
    marginTop: 4,
  },
});

export default FavouritesScreen;
