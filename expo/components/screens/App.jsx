import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, SafeAreaView, Text } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  )
}

export default () => {
  return (
    <>
      <StatusBar style='dark' />

      <SafeAreaView style={{ flex: 1 }}>
        <App />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})
