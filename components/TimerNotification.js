import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = 'Flashcards:Notifications'

export const createNotificationData = () => {
    return {
        content: {
            title: 'Notification',
            body: 'Check your new app to fill quiz',
            sound: true,
            vibrate: false,
            color: "blue"
        },
        trigger: {
            hour: 23,
            minute: 10
        },
    }
}

export function createNotification() {
    Notifications.scheduleNotificationAsync(createNotificationData())
        .then(() => {
            AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true)
            )
        })
}

export async function setLocalNotification () {
    await AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if(data === null) {
                Notifications.cancelAllScheduledNotificationsAsync()
                createNotification()
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}
