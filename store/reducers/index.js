import {
    ADD_CARD,
    ADD_DECK,
    FETCH_DECKS,
    DELETE_DECK
} from '../actions'

function decks (state={}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case FETCH_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case DELETE_DECK:
            delete state[action.deckId]
            return {
                ...state
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat([action.card])
                }
            }
        default:
            return state
    }
}

export default decks