import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import HooliganHeader from '../components/HooliganHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
      </View>

      <View style={styles.teamsContainer}>
        <Text style={styles.matchTime}>{time}</Text>
        <Text style={styles.teams}>{teams[0]}</Text>
        <Text style={styles.teamsSecond}>{teams[1]}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HooliganHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100, marginTop: 15}}>
        {renderBroadcast('Serie A', '10.03 18:45', ['Inter Milan', 'Roma'])}

        {renderBroadcast('La Liga', '20.04 21:30', [
          'Atletico Madrid',
          'Valencia',
        ])}

        {renderBroadcast('EPL', '15.05 19:00', [
          'Manchester City',
          'Tottenham Hotspur',
        ])}

        {renderBroadcast('NFL', '25.06 22:00', [
          'Denver Broncos',
          'Miami Dolphins',
        ])}

        {renderBroadcast('NHL', '30.07 20:15', [
          'Pittsburgh Penguins',
          'Washington Capitals',
        ])}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 40,
    borderColor: 'rgba(19, 55, 141, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    height: 120,
    elevation: 5,
  },
  league: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.main,
    textAlign: 'left',
    paddingBottom: 10,
  },
  leagueContainer: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  teamsContainer: {
    width: '65%',
  },
  matchTime: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.yellow,
    textAlign: 'center',
    width: '50%',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  teams: {
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: FONTS.black,
    fontSize: 17,
    color: COLORS.black,
    marginLeft: 5,
    height: 45,
    marginTop: 20,
  },
  teamsSecond: {
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: FONTS.black,
    fontSize: 17,
    color: COLORS.black,
    marginLeft: 5,
    height: 45,
    borderBottomRightRadius: 12,
  },
});
