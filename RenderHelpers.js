import React from 'react';
import { StyleSheet, Image, Button, Text, View } from 'react-native';

import { findRoute } from './Routes'

const insertImage = (route) => {
    if (route['image']) {
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={route['image']}/>
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
const generateRouteButtons = (route, navigator) => {
    if (route['no'] && route['yes']) {
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.button}
                    title='no'
                    onPress={() => navigator.push(findRoute(route['no']))}
                >No</Button>
                <Button
                    style={styles.button}
                    title='yes'
                    onPress={() => navigator.push(findRoute(route['yes']))}
                >Yes</Button>
            </View>
        );
    } else if (route['continue']){
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.button}
                    title='continue'
                    onPress={() => navigator.push(findRoute(route['continue']))}
                >Continue</Button>
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
    button: {
    },
});

export { insertImage, insertText, generateRouteButtons }
