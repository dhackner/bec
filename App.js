import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements'

import routes from './GeneratedRoutes.json';
import requiredImages from './GeneratedImages.js';
import styles from './style.js';

// TODO | v2 logging and reporting back of route navigation
// TODO | v3 parallel interventions (start preparing for transfer while
// doing XYZ) or maybe have like a global 'needs transfer' banner on the
// top

// TODO | Add disclaimer
// TODO | Tie back button across stacks; hide at beginning

const insertImages = (routeInfo) => {
    if (routeInfo['image']) {
        return routeInfo.image.map( (image, index) => {return <Image key={ index } style={ styles.image } source={ requiredImages[image] } />});
    }
}

const insertButtons = (navigation, routeInfo) => {
    if (routeInfo['no'] && routeInfo['yes']) {
        return (
            <View style={ styles.buttonContainer }>
                <Icon
                    reverse
                    name='menu'
                    accessibilityLabel='Open tab selection drawer'
                    onPress={ () => navigation.navigate('DrawerOpen') }
                />
                <Icon
                    reverse
                    color="gray"
                    name="arrow-back"
                    accessibilityLabel='Go to last screen'
                    onPress={ () => navigation.goBack() }
                />
                <Icon
                    reverse
                    color="gray"
                    type="MaterialCommunityIcons"
                    name="close"
                    accessibilityLabel='The answer to the question on the screen is no'
                    onPress={ () => navigation.navigate(routeInfo.no) }
                />
                <Icon
                    reverse
                    color="gray"
                    type="MaterialCommunityIcons"
                    name="check"
                    accessibilityLabel='The answer to the question on the screen is yes'
                    onPress={ () => navigation.navigate(routeInfo.yes) }
                />
            </View>
        );
    } else if (routeInfo['next']) {
        return (
            <View style={ styles.buttonContainer }>
                <Icon
                    reverse
                    name='menu'
                    accessibilityLabel='Open tab selection drawer'
                    onPress={ () => navigation.navigate('DrawerOpen') }
                />
                <Icon
                    reverse
                    color="gray"
                    name="arrow-back"
                    accessibilityLabel='Go to last screen'
                    onPress={ () => navigation.goBack() }
                />
                <Icon
                    reverse
                    color="gray"
                    name="arrow-forward"
                    accessibilityLabel='Go to next screen'
                    onPress={ () => navigation.navigate(routeInfo.next) }
                />
            </View>
        );
    } else {
        return null;
    }
}


var stacks = {};
for (var section in routes) {
    stacks[section] = StackNavigator(
        routes[section]['screens'].reduce((stack, routeInfo) => {
            stack[routeInfo.key] = ({ navigation }) => (
                <View style={ styles.flexContainer }>
                    <ScrollView>
                        <Text style={ styles.bodyText }>{ routeInfo.bodyText }</Text>
                        { insertImages(routeInfo) }
                    </ScrollView>
                    { insertButtons(navigation, routeInfo) }
                </View>
            );
            return stack;
        }, {}), {
            initialRouteName: routes[section]['initialRouteName'],
            navigationOptions: {
                headerTitle: section,
                headerLeft: null,
            }
        }
    );
}

const BECNavigator = DrawerNavigator(
    stacks,
    {
        initialRouteName: 'Intro',
        navigationOptions: {
        }
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

