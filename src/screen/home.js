/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
"use strict";

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { _get, _post } from "../shared/api/server";
import bindAll, { basicState } from "../shared/util/Statehelper";
import { Text, View, StyleSheet, ActivityIndicator,FlatList } from "react-native";
import { colors, sizes } from "../shared/constant/constant";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...basicState,
      results: {
        items: []
      }
    };
  }
  
  static navigationOptions = {
    title: "Books"
  };

  
  async componentWillMount() {
    bindAll(this);
  }

  componentDidMount() {
    this._getFood();
  }

  _getFood = async () => {
    console.log("_retrieveFood");
    let that = this;
    try {
      this.loading();
      let value = await _get(`/books`);
      if (value != null) {
        console.log("_retrieveFood");
        //console.log(value)
        that.notLoading();
        that.setState({
          results: JSON.parse(value)
        });
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => <ListItem title={item.name} />;

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.YELLOW} />
        </View>
      );
    } else {
      return (
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.results.items}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.WHITE
  },

  listContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch"
  }
});
