import React from 'react';
import { StyleSheet, Alert, ScrollView, TouchableHighlight, Navigator, Image, Button, Text, View } from 'react-native';

import Title from './Title'
import _ from 'lodash';

export default class App extends React.Component {

    render() {
        const routes = [
            {
                key: 'homepage',
                continue: 'speaking',
                title: 'WHO',
                image: require('./img/who_crest.png'),
            }, {
                key: 'speaking',
                no: 'speakingAtAll',
                yes: 'breathing',
                title: 'Is the patient speaking?',
                bodyText: 'Is the patient speaking easily?',
                image: require('./img/01_Adultheadtiltandchinlift.jpg'),
            }, {
                key: 'speakingAtAll',
                title: 'Can the patient speak at all?',
                image: require('./img/02_Neutralpositionininfants.jpg'),
            }, {
                key: 'breathing',
                no: 'assistBreathing',
                yes: 'normalBreathing',
                title: 'Is the patient breathing?',
            },
        ];

        findRoute = (routeKey) => {
            return _.find(routes, {key: routeKey})
        };

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
                        insertImage = () => {
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
                        insertText = () => {
                            if (route['bodyText']) {
                                return (
                                    <View style={styles.bodyText}>
                                    <Text>{route.bodyText}</Text>
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        }
                        generateRouteButtons = () => {
                            if (route['no'] && route['yes']) {
                                return (
                                    <View style={styles.buttonsContainer}>
                                        <Button
                                            title='no'
                                            onPress={() => navigator.push(findRoute(route['no']))}
                                        >No</Button>
                                        <Button
                                            title='yes'
                                            onPress={() => navigator.push(findRoute(route['yes']))}
                                        >Yes</Button>
                                    </View>
                                );
                            } else if (route['continue']){
                                return (
                                    <View style={styles.buttonsContainer}>
                                        <Button
                                            title='continue'
                                            onPress={() => navigator.push(findRoute(route['continue']))}
                                        >Continue</Button>
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        }

                        return (
                            <ScrollView style={styles.scrollContainer}>
                                <View>
                                    <Text style={styles.title}>{route.title}</Text>
                                </View>
                                {insertImage()}
                                {insertText()}
                                {generateRouteButtons()}
                            </ScrollView>
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
        flexDirection: 'column',
    },
    scrollContainer: {
        paddingTop: 40,
    },
    title: {
        textAlign: 'center',
    },
    imageContainer: {
    },
    image: {
    },
    bodyText: {
    },
    buttonsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

