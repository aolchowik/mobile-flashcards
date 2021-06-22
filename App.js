import * as React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './components/TimerNotification'
import { purple, white } from './utils/colors'
import decks from './store/reducers'
import middleware from './store/middleware'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 80,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
}
const RouteConfigs = {
    Decks:{
        name: "Decks",
        component: Decks,
        options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Decks'}
    },
    AddDeck:{
        component: AddDeck,
        name: "Add Deck",
        options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
    }
}
const MyStack = () => {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen
                name="Decks"
                component={Decks}
                options={{
                    headerTintColor: 'black',
                    headerStyle: { backgroundColor: 'tomato' },
                }}
            />
            <Stack.Screen
                name="AddDeck"
                component={AddDeck}
            />
            <Stack.Screen
                name="Deck"
                component={Deck}
            />
            <Stack.Screen
                name="AddCard"
                component={AddCard}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
            />
        </Stack.Navigator>
    )
}

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(decks, middleware)}>
                <NavigationContainer>
                    <MyStack />
                </NavigationContainer>
            </Provider>
        )
    }
}
