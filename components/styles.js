import { StyleSheet } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import {getStatusBarHeight} from "react-native-status-bar-height";

export const styles = StyleSheet.create({
    iosSubmit: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginVertical: 40,
        margin: 5,
        width: 150
    },
    androidSubmit: {
        backgroundColor: purple,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 2,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 100
    },
    webSubmit: {
        backgroundColor: gray,
        color: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    submitBtnText: {
        color: white,
        fontSize: 13,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: white,
        marginTop: getStatusBarHeight() || 0,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        width: 350
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    lineText: {
        paddingHorizontal: 10
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    }
})