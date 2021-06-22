import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { connect } from 'react-redux'

import { styles } from './styles'
import { addDeckToStorage, deleteDeckFromStorage } from '../utils/api'
import Decks from './Decks'
import { addDeck } from '../store/actions'
import { createDeckObject } from '../utils/helpers'
import { OwnButton } from "./OwnButton";

const AddDeck = ({navigation, dispatch}) => {
    const [ deckTitle, onChangeText ] = useState('')
    const alreadyLogged = false
    const deck = createDeckObject(deckTitle)

    const onSubmit = () => {
        dispatch(addDeck(deck))
        onChangeText('')

        addDeckToStorage(deck)
            .then(() => navigation.navigate('Decks'))
    }

    const reset = () => {
        deleteDeckFromStorage(deckTitle);
    };

    return alreadyLogged ? (
        <View style={styles.container}>
            <Ionicons name="md-happy" size={100} />
            <Text>You already logged your information for today</Text>
            <TextButton onPress={reset}>Reset</TextButton>
        </View>
    ) : (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={deckTitle}
                placeholder="Deck title"
                keyboardType="email-address"
            />
            <OwnButton onPress={onSubmit} btnText='Submit' />
            <Button
                style={styles.webSubmit}
                title="Go to Deck List"
                onPress={() => navigation.push('Decks')}
            />
        </View>
    );
}

export default connect()(AddDeck)