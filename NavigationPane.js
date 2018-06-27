import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'

import {styles} from './style.js';

export default class NavigationPane extends React.Component {
    render() {
        let {navigation, routeInfo} = this.props;
        let drawerOpenButton = (
            <Icon
                reverse
                name='menu'
                accessibilityLabel='Open tab selection drawer'
                onPress={ () => navigation.navigate('DrawerOpen') }
            />
        );
        let backButton = (
            <Icon
                reverse
                color="gray"
                name="arrow-back"
                accessibilityLabel='Go to last screen'
                onPress={ () => navigation.goBack() }
            />
        );
        if (routeInfo['no'] && routeInfo['yes']) {
            return (
                <View style={ styles.buttonContainer }>
                    {drawerOpenButton}
                    {backButton}
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
                    {drawerOpenButton}
                    {backButton}
                    <Icon
                        reverse
                        color="gray"
                        name="arrow-forward"
                        accessibilityLabel='Go to next screen'
                        onPress={ () => navigation.navigate(routeInfo.next) }
                    />
                </View>
            );
        }
        return (
            <View style={ styles.buttonContainer }>
                {drawerOpenButton}
            </View>
        );
    };
}