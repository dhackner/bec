import React from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { routes } from './Routes'

// TODO | v2 logging and reporting back of route navigation


const imageRow = (image, index) => {
    return <Image key={ index } style={ styles.image } source={ image } />
};
const insertImages = (routeInfo) => {
    if (routeInfo['image']) {
        return routeInfo.image.map(imageRow);
    }
}

const insertButtons = (navigation, routeInfo) => {
    if (routeInfo['no'] && routeInfo['yes']) {
        return (
            <View style={ styles.buttonContainer }>
                <Button
                    title='no'
                    accessibilityLabel='The answer to the question on the screen is no'
                    onPress={ () => navigation.navigate(routeInfo.no) } title="No"
                />
                <Button
                    title='yes'
                    accessibilityLabel='The answer to the question on the screen is yes'
                    onPress={ () => navigation.navigate(routeInfo.yes) } title="Yes"
                />
            </View>
        );
    } else if (routeInfo['next']) {
        return (
            <View style={ styles.buttonContainer }>
                <Button
                    title='next'
                    accessibilityLabel='Go to next screen'
                    onPress={ () => navigation.navigate(routeInfo.next) } title="Next"
                />
            </View>
        );
    } else {
        return null;
    }
}

const screenStack = routes.reduce((stack, routeInfo) => {
    stack[routeInfo.key] = {
        'screen': ({ navigation }) => (
            <View style={ styles.flexContainer }>
                <Text>{ routeInfo.bodyText }</Text>
                <ScrollView>
                    { insertImages(routeInfo) }
                </ScrollView>
                { insertButtons(navigation, routeInfo) }
            </View>
        ),
    };
    return stack;
}, {});
const BECNavigator = StackNavigator(screenStack, {
    navigationOptions: {
        title: 'WHO Emergency Care',
        headerTintColor: '#0F7FCA',
    },
    initialRouteName: 'homepage',
});

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.flexContainer}>
                <BECNavigator />
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
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
