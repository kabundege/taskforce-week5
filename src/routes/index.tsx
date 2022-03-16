import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { RootStackParamList } from '../../types'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewTodoScreen from '../screens/NewTodo'
import EditTodoScreen from '../screens/EditTodo'

const Stack = createNativeStackNavigator<RootStackParamList>()

/** 
 * * This hides the headers on screens 
 * */
const options = { headerShown:false }

export default () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='home' screenOptions={options}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Group screenOptions={{ presentation:"card" }} >
                <Stack.Screen name="newTodo" component={NewTodoScreen} />
                <Stack.Screen name="editTodo" component={EditTodoScreen} />
            </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
)
