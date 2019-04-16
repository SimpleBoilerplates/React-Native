import { Dimensions,StyleSheet } from 'react-native'
const YELLOW    = "#FCDE32";
const BLUE      = "#1898D8";
const BLACK     = "#212121";
const GRAY      = "#393939";
const RED       = "#EA212D";
const GREEN     = "#1DA752";
const WHITE     = "#FAFAFA";
const BASE_FONT = 14;
let WH = Dimensions.get('window').height;
let WW = Dimensions.get('window').width;
const colors = {
    YELLOW,
    BLUE,
    BLACK,
    GRAY,
    RED,
    GREEN,
    WHITE
}
const sizes = {
    BASE_FONT,
    WH,
    WW
}
const flexCenter = StyleSheet.create({
    center:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export {colors,sizes,flexCenter}