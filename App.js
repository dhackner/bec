import React from 'react';
// TODO | Upgrade to react-navigation
import { StyleSheet, ScrollView, Navigator, Text, View } from 'react-native';
import Button from 'react-native-button';

import { insertImage, insertText, generateRouteButtons } from './RenderHelpers'
import { findRoute } from './Routes'
import Title from './Title'

// TODO | codepush updates
// TODO | v2 logging and reporting back of route navigation
export default class App extends React.Component {

    render() {
        return (
            <View style={styles.flexContainer}>
                <Title>WHO Emergency Care</Title>
                <Navigator
                    initialRoute={findRoute('homepage')}
                    configureScene={
                        (route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump
                    }
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={{
                                LeftButton: (route, navigator, index, navState) =>
                                {
                                    var routes = navigator.getCurrentRoutes();
                                    if (!routes || routes.length <= 1) {
                                        return null;
                                    } else {
                                        return (
                                            <Button
                                                title='back'
                                                accessibilityLabel='Go to previous screen'
                                                onPress={navigator.pop}
                                            >Back
                                            </Button>
                                        );
                                    }
                                },
                                RightButton: (route, navigator, index, navState) =>
                                { return null },
                                Title: (route, navigator, index, navState) =>
                                { return null },
                            }}
                        />
                    }
                    renderScene={(route, navigator) => {
                        return (
                            <View style={styles.flexContainer}>
                                <ScrollView style={styles.scrollContainer}>
                                    {insertText(route)}
                                    {insertImage(route)}
                                </ScrollView>
                                {generateRouteButtons(route, navigator)}
                            </View>
                        );
                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        //paddingTop: 40,
    },
});
