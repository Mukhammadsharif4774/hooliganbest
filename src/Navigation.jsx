import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import HooliganHomeScreen from './pages/HooliganHomeScreen';
import HooliganCartScreen from './pages/HooliganCartScreen';
import HooliganCartSuccessScreen from './pages/HooliganCartSuccessScreen';
import HooliganReservationScreen from './pages/HooliganReservationScreen';
import HooliganReservationSuccessScreen from './pages/HooliganReserveSuccessScreen';
import HooliganContactsScreen from './pages/HooliganContactsScreen';
import HooliganTranslationsScreen from './pages/HooliganTranslationsScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_icon.png';
import Logo from './assets/drawer_logo.png';
import BackgroundImage from './assets/drawer_background.png';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'МАГАЗИН', screen: 'HooliganHomeScreen'},
    {label: 'БРОНЬ СТОЛИКА', screen: 'HooliganReservationScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'HooliganTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'HooliganContactsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={[
              styles.drawerItem,
              {
                backgroundColor:
                  label === 'МАГАЗИН' ? COLORS.yellow : 'transparent',
              },
            ]}>
            <Text style={styles.itemText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('HooliganCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const drawerScreens = [
  {name: 'HooliganHomeScreen', component: HooliganHomeScreen},
  {name: 'HooliganCartScreen', component: HooliganCartScreen},
  {name: 'HooliganCartSuccessScreen', component: HooliganCartSuccessScreen},
  {name: 'HooliganReservationScreen', component: HooliganReservationScreen},
  {
    name: 'HooliganReservationSuccessScreen',
    component: HooliganReservationSuccessScreen,
  },
  {name: 'HooliganContactsScreen', component: HooliganContactsScreen},
  {name: 'HooliganTranslationsScreen', component: HooliganTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: width,
    alignSelf: 'center',
    paddingVertical: 40,
  },
  drawerItem: {
    justifyContent: 'center',
    width: width,
    marginTop: 15,
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
