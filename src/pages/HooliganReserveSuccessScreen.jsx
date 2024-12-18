import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import HooliganHeader from '../components/HooliganHeader';
import HooliganComponent from '../components/HooliganComponent';
import Success from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'HooliganHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <HooliganHeader />

      <Text style={styles.description}>
        Столик забронирован! {'\n'} Спасибо
      </Text>

      <Image
        source={Success}
        style={{
          marginTop: 20,
          width: width * 0.5,
          height: width * 0.5,
          objectFit: 'contain',
          alignSelf: 'center',
        }}
      />

      <HooliganComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  description: {
    paddingVertical: 15,
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.black,
    fontSize: 30,
    marginTop: '25%',
  },
});
