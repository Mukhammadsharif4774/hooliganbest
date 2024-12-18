import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import HooliganHeader from '../components/HooliganHeader';
import HooliganComponent from '../components/HooliganComponent';
import Icon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'HooliganHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <HooliganHeader />

      <Image source={Icon} style={styles.image} />

      <Text style={styles.text}>Спасибо за заказ!</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value="https://xn-----8kcabbt5akledey0bhkpwn7nsa3e.xn--p1ai/sportbar"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.black}
        />
      </View>

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
  qrContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 20,
    paddingVertical: 15,
    marginTop: '5%',
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: '25%',
  },
});
