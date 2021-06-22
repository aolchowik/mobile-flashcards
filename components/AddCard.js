import React, { useState } from 'react'
import {
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Button,
} from 'react-native'
import { connect } from 'react-redux'
import { Input } from 'react-native-elements'

import { styles } from './styles'
import { addDeckCardToStorage } from '../utils/api'
import { addCard } from '../store/actions'
import { OwnButton } from './OwnButton'

const AddCard = ({navigation, dispatch, deckId}) => {
    const [ question, onChangeQuestion ] = useState('')
    const [ answer, onChangeAnswer ] = useState('')

    const onSubmit = () => {
        const card = {
            question,
            answer
        }
        dispatch(addCard(card, deckId))
        onChangeAnswer('')
        onChangeQuestion('')

        addDeckCardToStorage(card, deckId)
            .then(() => navigation.navigate('Deck', {deckId}))
    }

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.lineText}>Type your question: </Text>
                <Input
                    onChangeText={onChangeQuestion}
                    value={question}
                    placeholder="Enter a question"
                    keyboardType="email-address"
                />
                <Text style={styles.lineText}>Type your answer: </Text>
                <Input
                    value={answer}
                    onChangeText={onChangeAnswer}
                    placeholder='Enter the answer'
                />
                <OwnButton onPress={onSubmit} btnText='Add card' />
                <Button
                    title="Go to Deck List"
                    onPress={() => navigation.push('Decks')}
                />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const mapStateToProps = ({}, props) => {
    const { deckId } = props.route.params
    return { deckId }
}

export default connect(mapStateToProps)(AddCard)