export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export const fetchDecks = (decks) => ({
    type: FETCH_DECKS,
    decks
})

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
})

export const deleteDeck = (deckId) => ({
    type: DELETE_DECK,
    deckId
})

export const addCard = (card, deckId) => ({
    type: ADD_CARD,
    card,
    deckId
})
