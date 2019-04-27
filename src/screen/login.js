"use strict";

import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator
} from "react-native";
import bindAll, { basicState } from "../shared/util/Statehelper";
import { colors, sizes } from "../shared/constant/constant";
import { url } from "../shared/constant/credential";
import axios from "axios";
import to from "await-to-js";
import { Button } from "react-native-elements";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...basicState,
      userName: "",
      password: ""
    };
  }

  async componentWillMount() {
    bindAll(this);
  }

  _signUp() {
    this.props.navigation.navigate("SignUp");
  }

  _login = async () => {
    if (!this.state.userName && !this.state.password) return false;
    this.loading();
    let payload = {
      email: this.state.userName.toLowerCase(),
      password: this.state.password.toLowerCase()
    };

    let [logerr, logged] = await to(axios.post(`${url}/login`, payload));
    this.notLoading();
    console.log(logerr, logged);
    if (logerr) {
      alert("Username or password invalid");
    } else {
      let saved = await AsyncStorage.setItem("token", tok);
      this.props.navigation.navigate("Main");
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.login}>
          <ActivityIndicator size="large" color={colors.YELLOW} />
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Text style={styles.smallText}>Username</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={userName => this.setState({ userName })}
            onBlur={e => Keyboard.dismiss()}
          />
          <Text style={styles.smallText}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            onBlur={e => Keyboard.dismiss()}
          />

          <View style={styles.contentButton}>
            <Button title="Log In" onPress={() => this._login} />
            <Button title="Sign Up" onPress={() => this._signUp()} />
          </View>
        </View>
      );
    }
  }
}
const cw = Math.floor(sizes.WW * 0.9);
const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.WHITE
  },

  contentButton: {
    alignContent: "stretch",
    alignItems: "stretch",
    display: "flex",
    justifyContent: "center"
  },

  smallText: {
    color: colors.BLACK,
    width: cw,
    marginBottom: 10
  },
  textInput: {
    borderColor: colors.BLACK,
    borderWidth: 1,
    fontSize: Math.floor(sizes.BASE_FONT * 1.3),
    padding: 8,
    width: cw,
    color: colors.WHITE,
    marginBottom: 20
  }
});
