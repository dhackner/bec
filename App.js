import React from 'react';
import { StyleSheet, ScrollView, TouchableHighlight, Navigator, Text, View } from 'react-native';

import { insertImage, insertText, generateRouteButtons } from './RenderHelpers'
import { findRoute } from './Routes'
import Title from './Title'

// TODO | codepush updates
// TODO | logging and back reporting of route ordering
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
                                    // TODO | Instead check if this is
                                    // the first route
                                    if (route.key === 'homepage') {
                                        return null;
                                    } else {
                                        return (
                                            <TouchableHighlight
                                                title='back'
                                                onPress={navigator.pop}
                                            ><Text>Back</Text>
                                            </TouchableHighlight>
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
