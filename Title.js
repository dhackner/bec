import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Title extends React.Component {
  render() {
    const {children} = this.props

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{children}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    paddingTop: 20,
    paddingBottom: 5,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
})
