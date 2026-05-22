import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import EventList from '../components/EventList';
import {colors} from '../constants/colors';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {loadEvents, toggleFavorite} from '../store/slices/eventsSlice';

const EventListingScreen = () => {
  const dispatch = useAppDispatch();
  const {list, loading, error} = useAppSelector(state => state.events);
  const userName = useAppSelector(state => state.auth.user?.name ?? 'Guest');

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const greeting = useMemo(() => `Hello ${userName}!`, [userName]);

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
          {greeting}
        </AppText>
        <AppText style={styles.subtitle} weight="regular">
          Are you ready to dance?
        </AppText>
      </View>

      {loading && list.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <EventList
          events={list}
          onToggleFavorite={handleToggleFavorite}
          emptyMessage={error || 'No events found'}
        />
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventListingScreen;
