import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Button from 'react-native-button';

import { findRoute } from './Routes'

const insertImage = (route) => {
    if (route['image']) {
        return (
            <View style={styles.imageContainer}>
                {route['image'].map((o, i) => <Image style={styles.image} source={o} key={i}/>)}
            </View>
        );
    } else {
        return null;
    }
}
const insertText = (route) => {
    if (route['bodyText']) {
        return (
            <View style={styles.bodyContainer}>
                <Text style={styles.body}>{route.bodyText}</Text>
            </View>
        );
    } else {
        return null;
    }
}

// TODO | After 50 screens, reset navigator stack and _routeIndex

const generateRouteButtons = (route, navigator) => {
    if (route['no'] && route['yes']) {
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    containerStyle={styles.buttonsInnerContainer}
                    style={styles.button}
                    title='no'
                    accessibilityLabel='The answer to the question on the screen is no3'
                    onPress={() => navigator.push(findRoute(route['no']))}
                >No</Button>
                <Button
                    containerStyle={styles.buttonsInnerContainer}
                    style={styles.button}
                    title='yes'
                    accessibilityLabel='The answer to the question on the screen is yes'
                    onPress={() => navigator.push(findRoute(route['yes']))}
                >Yes</Button>
            </View>
        );
    } else if (route['next']){
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    containerStyle={styles.buttonsInnerContainer}
                    style={styles.button}
                    title='next'
                    accessibilityLabel='Go to next screen'
                    onPress={() => navigator.push(findRoute(route['next']))}
                >Next</Button>
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: .2
        //borderWidth: 1,
    },
    body: {
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
    },
    image: {
        //flex: 1,
        width: 500,
        //borderWidth: 1,
        resizeMode: 'contain',
    },
    buttonsContainer: {
        flex: .05,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    buttonsInnerContainer: {
        flex: .5,
        padding:10,
        height:45,
        overflow:'hidden',
        backgroundColor: '#0F7FCA',
    },
    button: {
        fontSize: 20,
        color: 'black'
    },
});

export { insertImage, insertText, generateRouteButtons }
