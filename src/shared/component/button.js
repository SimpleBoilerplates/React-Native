import { TouchableOpacity, View, Text } from "react-native";
import { sizes, colors } from "./constants";
import React from "react";
export default function CustomButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.loginButton }}>
        <Text style={styles.loginText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}
const cw = sizes.WW * 0.9;
const styles = {
  loginButton: {
    width: cw,
    backgroundColor: colors.YELLOW,
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10
  },
  loginText: {
    fontWeight: "bold",
    fontSize: Math.floor(sizes.BASE_FONT * 1.2)
  }
};
