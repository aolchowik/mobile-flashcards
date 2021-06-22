import AsyncStorage from '@react-native-async-storage/async-storage'
import { DECKS_STORAGE_KEY } from './_calendar'
import { defaultData } from './_data'

export function fetchDecksFromStorage () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((response) => {
          if(!response) {
              AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultData))
              return defaultData
          } else {
              return JSON.parse(response)
          }
      })
}

export function deleteDeckFromStorage(deckId) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((response) => {
            const decks = JSON.parse(response);
            decks[deckId] = undefined;
            delete decks[deckId];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        })
}

export async function addDeckToStorage(newDeck) {
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
}

export async function addDeckCardToStorage(card, deckId) {
    return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((response) => {
            const decks = JSON.parse(response)
            decks[deckId] = {
                ...decks[deckId],
                questions: [
                    ...decks[deckId].questions,
                    card
                ]
            }
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
        })
}
