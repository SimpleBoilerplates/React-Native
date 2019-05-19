import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";

export class MyListItem extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}