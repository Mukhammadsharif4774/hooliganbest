import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../components/AppContext';
import HooliganCartItemComponent from '../components/HooliganCartItemComponent';
import HooliganComponent from '../components/HooliganComponent';
import HooliganHeader from '../components/HooliganHeader';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import CartIcon from '../assets/cart_icon.png';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    const calculatedPrice = cart.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );
    setTotalPrice(calculatedPrice);
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'HooliganCartSuccessScreen'
      : 'HooliganHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});

    if (cart.length) {
      AsyncStorage.setItem('cartList', JSON.stringify([]));
      toggleRefresh(!shouldRefresh);
    }
  };

  return (
    <View style={styles.container}>
      <HooliganHeader />

      {!cart.length && (
        <>
          <Text style={styles.text}>{'Корзина пуста...'.toUpperCase()}</Text>
          <Image source={CartIcon} style={styles.empty} />
        </>
      )}

      {cart.length > 0 && (
        <>
          <View style={{height: height * 0.7}}>
            <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
              {cart.map((item, index) => (
                <HooliganCartItemComponent item={item} key={index} />
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {cart.length ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.sumTitle}>Сума к оплате</Text>
          <Text style={styles.sum}>{totalPrice}$</Text>
        </View>
      ) : (
        ''
      )}

      <HooliganComponent
        text={cart.length ? `ЗАКАЗАТЬ` : 'На главную'}
        style={styles.orderButton}
        onPress={handleOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: COLORS.white,
  },
  flex: {
    height: 200,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyIcon: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'center',
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  sumTitle: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.yellow,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.yellow,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: COLORS.main,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: 30,
    marginVertical: '25%',
    paddingVertical: 30,
  },
});
