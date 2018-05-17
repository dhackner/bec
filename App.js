import React from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import routes from './GeneratedRoutes.json';
import requiredImages from './GeneratedImages.js';
import styles from './style.js';

// TODO | v2 logging and reporting back of route navigation
// TODO | v3 parallel interventions (start preparing for transfer while
// doing XYZ) or maybe have like a global 'needs transfer' banner on the
// top

// TODO | Disclaimer
// TODO | Back button when navigating into a new section doesnt take you
// back to old section

const insertImages = (routeInfo) => {
    if (routeInfo['image']) {
        return routeInfo.image.map( (image, index) => {return <Image key={ index } style={ styles.image } source={ requiredImages[image] } />});
    }
}

// TODO | Better place for section selector
const insertButtons = (navigation, routeInfo) => {
    if (routeInfo['no'] && routeInfo['yes']) {
        return (
            <View style={ styles.buttonContainer }>
                <Button
                    title='<Sections'
                    onPress={ () => navigation.navigate('DrawerOpen') }
                />
                <Button
                    title='No'
                    accessibilityLabel='The answer to the question on the screen is no'
                    onPress={ () => navigation.navigate(routeInfo.no) }
                />
                <Button
                    title='Yes'
                    accessibilityLabel='The answer to the question on the screen is yes'
                    onPress={ () => navigation.navigate(routeInfo.yes) }
                />
            </View>
        );
    } else if (routeInfo['next']) {
        return (
            <View style={ styles.buttonContainer }>
                <Button
                    title='<Sections'
                    onPress={ () => navigation.navigate('DrawerOpen') }
                />
                <Button
                    title='Next'
                    accessibilityLabel='Go to next screen'
                    onPress={ () => navigation.navigate(routeInfo.next) }
                />
            </View>
        );
    } else {
        return null;
    }
}


const buildStackNavigator = (routes) => {
    return StackNavigator(
        routes['screens'].reduce((stack, routeInfo) => {
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
        }, {}), {
            initialRouteName: routes['initialRouteName']
        }
    );
}

var stacks = {};
for (var section in routes) {
    stacks[section] = {
        screen: buildStackNavigator(routes[section]),
    }
}

const BECNavigator = DrawerNavigator(
    stacks,
    {
        initialRouteName: 'Intro'
    }
);

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.flexContainer}>
                <BECNavigator />
            </View>
        );
    }
}

