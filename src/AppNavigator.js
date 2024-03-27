import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ViewPhoto from './screens/ViewPhoto'
import ViewVideo from './screens/ViewVideo'
import Search from './screens/Search'
import Home from './screens/Home'
import Splash from './screens/Splash'
const stack = createStackNavigator()
const AppNavigator = () => {
  return (
   <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name='Splash' component={Splash} options={{headerShown:false}}></stack.Screen>
            <stack.Screen name='Home' component={Home} options={{headerShown:false}}></stack.Screen>
            <stack.Screen name='Search' component={Search} options={{headerShown:false}}></stack.Screen>
            <stack.Screen name='ViewPhoto' component={ViewPhoto} options={{headerShown:false}}></stack.Screen>
            <stack.Screen name='ViewVideo' component={ViewVideo} options={{headerShown:false}}></stack.Screen>
        </stack.Navigator>
         
   </NavigationContainer>
  )
}

export default AppNavigator