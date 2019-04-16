/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import {_get,_post} from '../shared/api/server';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Books',
      };
    
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //         results: {
    //             items: []
    //         }
    //     }
    // }

    state={
        ...basicState,
        results: {
            items: []
        }
    }
    async componentWillMount(){
        bindAll(this);  
    }

    componentDidMount() {
        this._getFood();
    }

   

    _getFood = async () => {
        console.log("_retrieveFood")
        let that = this;
        try {
            this.loading();
            let value = await _get(`/books`);
           if (value != null){
               console.log("_retrieveFood")
               //console.log(value)
               that.notLoading();
               that.setState({
                results: JSON.parse(value)
                        });
           }
        } catch (error) {
            console.log(error)
          // Error retrieving data
        }
    }    

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
      />
    )

    render() {

        if(this.state.loading){
            return (<View style={styles.login}>
                    <ActivityIndicator size="large" color={colors.YELLOW}></ActivityIndicator>
                </View>);
        }else{
        return ( 
            <View >
    
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    normalText:{
        fontWeight: '600',
        color: '#070707'
    },
});