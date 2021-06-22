import * as React from 'react'
import {
    Animated,
    Button,
    View
} from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { OwnButton } from './OwnButton'
import { styles } from './styles'

class Deck extends React.Component {
    handleStartQuiz = () => {
        const { navigation, deck } = this.props
        navigation.navigate('Quiz', {deckId: deck.title});
    }

    handleAddQuestion = () => {
        const { navigation, deck } = this.props
        navigation.navigate('AddCard', {deckId: deck.title});
    }

    render() {
        const loading = {
            opacity: new Animated.Value(1),
            opacityFront: new Animated.Value(0)
        }

        Animated.sequence([

            Animated.timing(loading.opacityFront, {toValue: 1, duration: 1000, useNativeDriver: false})
        ]).start()

        const { deck, navigation } = this.props
        const title = `Go to Deck List`

        return (
            <View style={styles.container}>
                <Animated.View style={{opacity: loading.opacityFront}}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>Deck - {deck.title}</Text>
                    <Text style={{textAlign: 'center', marginVertical:30}}>Number of cards: {deck.questions.length}</Text>
                    <View style={styles.buttonsWrapper}>
                        <OwnButton onPress={this.handleAddQuestion} btnText='Add Card' />
                        <OwnButton onPress={this.handleStartQuiz} btnText='Start Quiz' />
                    </View>
                </Animated.View>
                <Button
                    style={styles.webSubmit}
                    title={title}
                    onPress={() => {
                        Animated.timing(loading.opacityFront, {toValue: 0, duration: 200, useNativeDriver: true}).start(
                            navigation.push('Decks')
                        )
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (decks, props) => {
    const { deckId } = props.route.params
    const deck = decks[deckId]
    return { deck }
}

export default connect(mapStateToProps)(Deck)
