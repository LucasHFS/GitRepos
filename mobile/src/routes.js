import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Main from './pages/Main';
import User from './pages/User';
import Repo from './pages/Repo';

const Stack = createStackNavigator();

function Routes (){

    return (
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            headerStyle: {
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Repo" component={Repo} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Routes;
