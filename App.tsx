import React from 'react';
import { MainScreen } from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MangaDetails from './screens/MangaDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChapterReader from './components/reader/ChapterReader';
import ProfileScreen from './screens/ProfileScreen';
import TabletMangaDetails from './screens/tablet/TabletMangaDetails';
import TabletProfileScreen from './screens/tablet/TabletProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreenStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='MangaDetails' component={MangaDetails} />
        <Stack.Screen name='ChapterReader' component={ChapterReader} />
    </Stack.Navigator>
);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='MainScreen' component={MainScreen} />
                <Stack.Screen name='MangaDetails' component={MangaDetails} />
                <Stack.Screen name='MangaDetailsTablet' component={TabletMangaDetails} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='TabletProfile' component={TabletProfileScreen} />
                <Stack.Screen name='ChapterReader' component={ChapterReader} />
            </Stack.Navigator>
            {/* <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name='Home' component={MainScreenStack} />
            </Tab.Navigator> */}
        </NavigationContainer>
    );
}
