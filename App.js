import React from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import routes from './GeneratedRoutes.json';
import requiredImages from './GeneratedImages.js';

// TODO | v2 logging and reporting back of route navigation
// TODO | v3 parallel interventions (start preparing for transfer while
// doing XYZ) or maybe have like a global 'needs transfer' banner on the
// top


const imageRow = (image, index) => {
    return <Image key={ index } style={ styles.image } source={ requiredImages[image] } />
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
                    onPress={ () => navigation.navigate(routeInfo.no) }
                />
                <Button
                    title='yes'
                    accessibilityLabel='The answer to the question on the screen is yes'
                    onPress={ () => navigation.navigate(routeInfo.yes) }
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
                <Text style={ styles.bodyText }>{ routeInfo.bodyText }</Text>
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
    navigationOptions: ({ navigation }) => {
        return {
            title: 'WHO Emergency Care',
            headerTintColor: '#0F7FCA',
            headerRight: <Button title="Home" accessibilityLabel='Go to homepage' onPress={ () => navigation.navigate('homepage') } />
        };
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
    bodyText: {
        fontSize: 20
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
