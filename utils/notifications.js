import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const NOTIFIER_STORAGE_KEY = '@flash_cards_notifirer'

export const createNotificationData = () => {
    return {
        title: 'notification Flashcards notifier',
        body: 'Please fill at least one quiz for today',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: false
        }
    }
}

export async function clearNotifier() {
    await AsyncStorage.getItem(NOTIFIER_STORAGE_KEY)
    Notifications.cancelAllLocalNotificationsAsync()
}

export async function setLocalNotifier() {
    const notifierData = await AsyncStorage.getItem(NOTIFIER_STORAGE_KEY);
    const notifierDataParsed = JSON.parse(notifierData);


    const notificationsPermissions = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
    )

    if(notificationsPermissions.status === 'granted') {
        Notifications.cancelAllLocalNotificationsAsync()
    }

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(13)
    tomorrow.setMinutes(59)
    // let now = new Date();
    // now.setDate(now.getDate());
    // now.setSeconds(now.getSeconds() + 15);

    Notifications.scheduleNotificationAsync(createNotifier(), {
        time: tomorrow,
        repeat: 'day'
    })

    AsyncStorage.setItem(
        NOTIFIER_STORAGE_KEY,
        JSON.stringify(true)
    )
}