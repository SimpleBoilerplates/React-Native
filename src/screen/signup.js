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

export default class SignUpScreen extends Component {
  state = {
    ...basicState,
    name: "",
    userName: "",
    password: ""
  };
  async componentWillMount() {
    bindAll(this);
  }

  _login() {
    this.props.navigation.goBack();
  }

  _signUp = async () => {
    if (!this.state.userName && !this.state.password) return false;
    this.loading();
    let payload = {
      name: this.state.name.toLowerCase(),
      email: this.state.userName.toLowerCase(),
      password: this.state.password.toLowerCase()
    };

    let [logerr, logged] = await to(axios.post(`${url}/signup`,payload));
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
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.YELLOW} />
        </View>
      );
    } else
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
            <Button title="Sign Up" onPress={this._signUp} />
            <Button title="Log In" onPress={() => this._login()} />
          </View>
        </View>
      );
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
