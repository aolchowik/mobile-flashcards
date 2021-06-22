import * as React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { fetchDecksFromStorage } from '../utils/api'
import { fetchDecks } from '../store/actions'
import { styles } from './styles'
import { OwnButton } from './OwnButton'

const Item = ({ title }) => (
    <View style={styles.item} key={title}>
        <Text style={styles.title}>{title}</Text>
    </View>
)

class Decks extends React.Component {
    state = {
        loaded: false,
    }

    renderItem = ({ item }) => <Item title={item.title} />

    componentDidMount() {
        const { dispatch } = this.props

        fetchDecksFromStorage()
            .then((response) => dispatch(fetchDecks(response)))
            .then(() => this.setState(() => ({loaded: true})))
    }

    handlePress = deckId => {
        const { navigation } = this.props;
        navigation.navigate('Deck', { deckId });
    };

    render() {
        const { decks, navigation } = this.props

        if(!this.state.loaded) {
            return (
                <View>
                    <Text>Data is loading...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {
                    Object.keys(decks)
                        .map((deckId) =>
                            (
                                <TouchableOpacity
                                    key={deckId}
                                    onPress={() => this.handlePress(deckId)}
                                >
                                    <ListItem key={deckId} style={{width:750}}>
                                        <ListItem.Content>
                                            <ListItem.Title>{decks[deckId].title}</ListItem.Title>
                                            <ListItem.Subtitle>cards: {decks[deckId].questions.length}</ListItem.Subtitle>
                                            <ListItem.Chevron />
                                        </ListItem.Content>
                                    </ListItem>
                                </TouchableOpacity>
                            )
                        )
                }
                <OwnButton onPress={() => navigation.navigate('AddDeck')} btnText='Add New decks' />
            </View>
        )
    }
}

const mapStateToProps = (decks) => {
    return { decks }
}

export default connect(mapStateToProps)(Decks)