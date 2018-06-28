import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Button, SearchBar} from 'react-native-elements'

import routes from './GeneratedRoutes.json';
import requiredImages from './GeneratedImages.js';
import NavigationPane from './NavigationPane.js';
import {commonHeaderStyling, styles} from './style.js';

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

class SearchScreen extends React.Component {
    static navigationOptions = {headerTitle: "Search", ...commonHeaderStyling};
    render() {
        let {navigation} = this.props;
        return <View>
            <Text>Under Development</Text>
            <SearchBar placeholder='Type Here...' />
            <NavigationPane navigation={navigation} routeInfo={{}} />
        </View>;
    }
}

class BECScreen extends React.Component {
    render() {
        let {navigation, routeInfo } = this.props;
        return (
            <View style={ styles.flexContainer }>
                <ScrollView>
                    <Text style={ styles.bodyText }>{ routeInfo.bodyText }</Text>
                    { insertImages(routeInfo) }
                </ScrollView>
                <NavigationPane navigation={navigation} routeInfo={routeInfo} />
            </View>
        );
    }
};


let stacks = {
    'Search': StackNavigator({
        search: {
            screen: SearchScreen
        },
    })
};
for (let section in routes) {
    let screens = routes[section]['screens'].reduce((stack, routeInfo) => {
        stack[routeInfo.key] = ({ navigation }) => (
            <BECScreen navigation={navigation} routeInfo={routeInfo}/>
        );
        return stack;
    }, {});
    stacks[section] = StackNavigator(
        screens, {
            initialRouteName: routes[section]['initialRouteName'],
            navigationOptions: ({ navigation }) => {
                return {
                    headerRight: <Button
                        icon={{name: 'search'}}
                        backgroundColor='#473830'
                        onPress={() => navigation.navigate('search')}
                    />,
                    headerTitle: section,
                    ...commonHeaderStyling};
            }
        }
    );
}

const BECNavigator = DrawerNavigator(
    stacks,
    {
        initialRouteName: 'Intro',
        drawerWidth: 200,
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

