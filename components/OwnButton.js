import * as React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { styles } from './styles'

export const OwnButton = ({ onPress, btnText }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[Platform.OS === 'ios' ? styles.iosSubmit : styles.androidSubmit]}
        >
            <Text style={styles.submitBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}
