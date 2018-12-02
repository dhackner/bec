import React from 'react';
import { Image, Picker, ScrollView, Text, WebView, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements'

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


class SummaryScreen extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    static navigationOptions = {headerTitle: "Summary", ...commonHeaderStyling};
    render() {
        let {navigation} = this.props;
        return (
            <View style={ styles.flexContainer }>
                <Button raised rounded title='+ Select' onPress={() => this.setState({showPicker: true}) }/>
                {this.state.showPicker &&
                <Picker
                    selectedValue={this.state.selected}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue, showPicker: false})}>
                    <Picker.Item label="ABCDE" value="ABCDE" />
                    <Picker.Item label="Airway Obstruction" value="AirwayObstruction" />
                    <Picker.Item label="Flail Chest" value="FlailChest" />
                    <Picker.Item label="Haemothorax" value="Haemothorax" />
                    <Picker.Item label="Hypovolaemic Shock" value="HypovolaemicShock" />
                    <Picker.Item label="Pericardial Tamponade" value="PericardialTamponade" />
                    <Picker.Item label="Severe Head Injury" value="SevereHeadInjury" />
                    <Picker.Item label="Sucking Chest Wound" value="SuckingChestWound" />
                    <Picker.Item label="Tension Pneumothorax" value="TensionPneumothorax" />
                </Picker>
                }
                { this.state.selected == 'ABCDE' && <WebView originWhitelist={['*']} source={require('./img/summaries/ABCDE.html')} />}
                { this.state.selected == 'AirwayObstruction' && <WebView originWhitelist={['*']} source={require('./img/summaries/AirwayObstruction.html')} />}
                { this.state.selected == 'FlailChest' && <WebView originWhitelist={['*']} source={require('./img/summaries/FlailChest.html')} />}
                { this.state.selected == 'Haemothorax' && <WebView originWhitelist={['*']} source={require('./img/summaries/Haemothorax.html')} />}
                { this.state.selected == 'HypovolaemicShock' && <WebView originWhitelist={['*']} source={require('./img/summaries/HypovolaemicShock.html')} />}
                { this.state.selected == 'PericardialTamponade' && <WebView originWhitelist={['*']} source={require('./img/summaries/PericardialTamponade.html')} />}
                { this.state.selected == 'SevereHeadInjury' && <WebView originWhitelist={['*']} source={require('./img/summaries/SevereHeadInjury.html')} />}
                { this.state.selected == 'SuckingChestWound' && <WebView originWhitelist={['*']} source={require('./img/summaries/SuckingChestWound.html')} />}
                { this.state.selected == 'TensionPneumothorax' && <WebView originWhitelist={['*']} source={require('./img/summaries/TensionPneumothorax.html')} />}

                <NavigationPane navigation={navigation} routeInfo={{}} />
            </View>
        )
    }
}

const insertImages = (routeInfo) => {
    if (routeInfo['image']) {
        return routeInfo.image.map( (image, index) => {return <Image key={ index } style={ styles.image } source={ requiredImages[image] } />});
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
    'Summary': StackNavigator({
        search: {
            screen: SummaryScreen
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

