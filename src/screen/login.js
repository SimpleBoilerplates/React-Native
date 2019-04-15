import React, { Component } from 'react'
import { Text, View,AsyncStorage,StyleSheet,TextInput,Keyboard,ActivityIndicator } from 'react-native'
import bindAll,{basicState} from '../shared/util/statehelpers';
import {colors,sizes} from '../shared/component/constants';
import {url} from '../shared/constant/credential';
import axios from 'axios';
import to from 'await-to-js';
import { Button } from 'react-native-elements';

export default class Login extends Component {
    state={
        ...basicState,
        userName:"",
        password:""
    }
    async componentWillMount(){
        bindAll(this);  
    }
    login=async ()=>{
        if(!this.state.userName && !this.state.password) return false;
        this.loading();
        let payload = {
            email: this.state.userName.toLowerCase(),
            password: this.state.password.toLowerCase()
        }

        let [logerr,logged] = await to(axios.get(`${url}/login`,{headers:{
            "Authorization":tok
        }}));
        this.notLoading();
        console.log(logerr,logged);
        if(logerr){
            alert("Username or password invalid");
        }
        else{
            let saved = await AsyncStorage.setItem('token',tok);
            this.props.navigation.navigate('MainScreen');
        }
    }
    render() {
        if(this.state.loading){
            return (<View style={styles.login}>
                    <ActivityIndicator size="large" color={colors.YELLOW}></ActivityIndicator>
                </View>);
        }
        return (
        <View style ={styles.login}>
            <Text style={styles.smallText}>Username</Text>
            <TextInput
            style={styles.text}
            onChangeText={userName=>this.setState({userName})}
            onBlur={e=>Keyboard.dismiss()}></TextInput>
            <Text style={styles.smallText}>Password</Text>
            <TextInput
            style={styles.text}
            secureTextEntry={true}
            onChangeText={password=>this.setState({password})} onBlur={e=>Keyboard.dismiss()}></TextInput>
           
           <Button   title="Log In" onPress={this.login}/>
        </View>
        )
    }
}
const cw = Math.floor(sizes.WW*0.9);
const styles = StyleSheet.create({
    login:{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        height:'100%',
        backgroundColor:colors.BLUE
    },
    smallText:{
        color:colors.WHITE,
        width:cw,
        marginBottom:10
    },
    text:{
        borderColor: colors.GRAY,
        fontSize:Math.floor(sizes.BASE_FONT*1.3),
        padding: 8,
        width:cw,
        color:colors.WHITE,
        marginBottom:20
    }
})