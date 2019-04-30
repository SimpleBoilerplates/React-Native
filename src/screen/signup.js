"use strict";

import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Button
} from "react-native";
import bindAll, { basicState } from "../shared/util/Statehelper";
import { colors, sizes } from "../shared/constant/constant";
import { url } from "../shared/constant/credential";
import axios from "axios";
import to from "await-to-js";

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...basicState,
      name: "",
      mail: "",
      password: ""
    };
  }


  componentDidMount() {
    bindAll(this);
  }

  _login() {
    this.props.navigation.goBack();
  }

  _signUp = async () => {
    if (!this.state.userName && !this.state.password) return false;
    this.loading();
    const payload = {
      name: this.state.name.toLowerCase(),
      email: this.state.mail.toLowerCase(),
      password: this.state.password
    };

    console.log( JSON.stringify(payload))

    let [error, result] = await to(axios.post(`${url}signup`, payload));

    this.notLoading();
    console.log(error, result);
    if (error) {
      alert(error.response);
    } else {
      this.props.navigation.goBack();
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
         

          <Text style={styles.smallText}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            onBlur={e => Keyboard.dismiss()}
          />

    <Text style={styles.smallText}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={ mail => this.setState({ mail })}
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
            <Button
              style={styles.button}
              title="Sign Up"
              onPress={this._signUp()}
            />
            <Button
              style={styles.button}
              title="Log In"
              onPress={() => this._login()}
            />
          </View>
        </View>
      );
  }
}
const cw = Math.floor(sizes.WW * 0.9);
const styles = StyleSheet.create({
  content: {
    alignContent: "stretch",
    alignItems: "stretch",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.WHITE,
    padding: 16
  },

  contentButton: {
    alignContent: "stretch",
    alignItems: "stretch",
    display: "flex",
    justifyContent: "center"
  },

  button: {
    marginBottom: 20
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
    color: colors.BLACK,
    marginBottom: 20
  }
});
