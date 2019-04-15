import React, { Component } from 'react';
import { View,ActivityIndicator,StyleSheet,AsyncStorage } from 'react-native';
import { colors } from '../shared/constant/constant';
export default class LoadingPage extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    setTimeout(e=>{this._bootstrap()},500);
  }
  _bootstrap = async()=>{
    let token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token?'MainScreen':'Login');
  }
  render() {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    loadingPage:{
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        backgroundColor:colors.YELLOW
    }
})