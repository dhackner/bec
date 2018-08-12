import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'

import {styles} from './style.js';

export default class NavigationPane extends React.Component {
    render() {
        let {navigation, routeInfo} = this.props;
        let drawerOpenButton = (
            <Button
                rounded
                raised
                backgroundColor='#0077C0'
                title='&#9776;'
                accessibilityLabel='Open tab selection drawer'
                onPress={ () => navigation.navigate('DrawerOpen') }
            />
        );
        let backButton = (
            <Button
                rounded
                raised
                color='#00619A'
                backgroundColor='#F1F1F1'
                title='<'
                accessibilityLabel='Go to last screen'
                onPress={ () => navigation.goBack() }
            />
        );
        if (routeInfo['no'] && routeInfo['yes']) {
            return (
                <View style={ styles.buttonContainer }>
                    {drawerOpenButton}
                    {backButton}
                    <Button
                        rounded
                        raised
                        color='#00619A'
                        backgroundColor='#F1F1F1'
                        title='No'
                        accessibilityLabel='The answer to the question on the screen is no'
                        onPress={ () => navigation.navigate(routeInfo.no) }
                    />
                    <Button
                        rounded
                        raised
                        color='#00619A'
                        backgroundColor='#F1F1F1'
                        title='Yes'
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
                    <Button
                        rounded
                        raised
                        color='#00619A'
                        backgroundColor='#F1F1F1'
                        title='Next'
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
