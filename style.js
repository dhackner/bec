import { Dimensions, StyleSheet } from 'react-native';

const blue = '#0F7FCA';
const deviceWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    bodyText: {
        fontSize: 30
    },
    flexContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        width: deviceWidth,
        resizeMode: 'contain'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});
export const commonHeaderStyling = {
    headerStyle: {
        backgroundColor: '#473830',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerLeft: null,
};
