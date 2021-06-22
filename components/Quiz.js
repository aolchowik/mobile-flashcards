import React, { useState } from 'react'
import {
    View,
    Button,
} from 'react-native'
import { Card, Text } from 'react-native-elements'
import { OwnButton } from './OwnButton'
import { connect } from 'react-redux'
import { styles } from './styles'
import { clearLocalNotification, setLocalNotification } from "./TimerNotification";

const Quiz = ({navigation, deck}) => {
    const [activeCard, setActiveCard] = useState(0)
    const [score, setScore] = useState(0)
    const disableQuiz = deck.questions.length === 0
    const deckQuestionsNumber = deck.questions.length
    const completeQuiz = activeCard >= deck.questions.length && !disableQuiz
    const startQuiz = activeCard < deck.questions.length && !disableQuiz
    const [showAnswer, setShowAnswer] = useState(false)

    const flipAnswerCard = () => {
        setShowAnswer(true)
    }

    const calculateScore = (value) => {
        setShowAnswer(false)
        setScore(score + value)
        setActiveCard(activeCard + 1)
    }

    if(completeQuiz) {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>Quiz for deck - {deck.title}</Card.Title>
                <Card.Divider />
                { disableQuiz &&
                <View>
                    <Text h5>
                        The deck doesn't contain any questions.
                        Please add some questions to start the quiz.
                    </Text>
                </View>
                }
                { completeQuiz &&
                <View>
                    <Text>Quiz completed</Text>
                    <Text>Your final score: {score / deckQuestionsNumber * 100}% of correct answers</Text>
                </View>
                }
                { startQuiz &&
                    <View>
                        <Text style={{marginBottom: 10}}>Question {activeCard+1}/{deckQuestionsNumber}</Text>
                        <Text style={{marginBottom: 10}}>{deck.questions[activeCard].question}</Text>
                        {showAnswer && <Text h6 style={{fontStyle: 'italic', marginHorizontal: 10}}>{deck.questions[activeCard].answer}</Text>}
                        <View style={styles.buttonsWrapper}>
                            <OwnButton onPress={() => calculateScore(1)} btnText='Correct' />
                            <OwnButton onPress={() => calculateScore(0)} btnText='Incorrect' />
                            <OwnButton onPress={flipAnswerCard} btnText='Show answer' />
                        </View>
                    </View>
                }
            </Card>
            <Button
                style={{paddingTop: 20}}
                title="Go to Deck List"
                onPress={() => navigation.push('Decks')}
            />
        </View>
    )
}

const mapStateToProps = (decks, props) => {
    const { deckId } = props.route.params
    const deck = decks[deckId]
    return { deck }
}

export default connect(mapStateToProps)(Quiz)