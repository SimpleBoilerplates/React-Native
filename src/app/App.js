import React,{Component} from 'react';
import {createStackNavigator,createSwitchNavigator,View,ActivityIndicator} from 'react-navigation';
import {flexCenter} from '../shared/constant/constants';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login'
import LoadingPage from '../screen/loading'
const RootStack = createStackNavigator({
  Home:{screen:HomeScreen}
  },
  {
    initialRouteName:'Home',
    headerMode:'none'
  });
  const RootSwitch = createSwitchNavigator({
    Loading:{screen:LoadingPage},
    Login:LoginScreen,
    MainScreen:{screen:RootStack}
  },{
    initialRouteName:'Loading',
    headerMode:'none'
  })
export default class Root extends React.Component {
  render() {
      return <RootSwitch/>;
  }
}