"use strict";

import {createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import HomeScreen from "../screen/home";
import LoginScreen from "../screen/login";
import SignUpScreen from "../screen/signup";

import LoadingPage from "../screen/loading";
import React from "react";

const AppStack = createStackNavigator(
    {
        Home: HomeScreen
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
        SignUp: SignUpScreen
    },
    {
        initialRouteName: "Login",
        headerMode: "none"
    }
);
const RootSwitch = createSwitchNavigator(
    {
        Loading: LoadingPage,
        Auth: AuthStack,
        App: AppStack
    },
    {
        initialRouteName: "Loading",
        headerMode: "none"
    }
);

const App = createAppContainer(RootSwitch);
export default App;

const AppContainer = createAppContainer(RootSwitch);

