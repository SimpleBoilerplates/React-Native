import React, {Component} from "react";
import {View} from "react-native";

export default class Conditional extends Component {
    render() {
        if (!this.props.condition) return null;
        return <View style={this.props.style}>{this.props.children}</View>;
    }
}
