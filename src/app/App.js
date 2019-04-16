'use strict';

import {createStackNavigator,createSwitchNavigator,View,ActivityIndicator,createAppContainer} from 'react-navigation';
import HomeScreen from '../screen/home';
import LoginScreen from '../screen/login'
import SignUpScreen from '../screen/signup'
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
    SignUpScreen: SignUpScreen,
    MainScreen:{screen:RootStack}
  },{
    initialRouteName:'Loading',
    headerMode:'none'
  })

  const App = createAppContainer(RootSwitch);

// export default class App extends Component {
//   render() {
//     return <RootSwitch/>;
//   }
// }

export default App;
