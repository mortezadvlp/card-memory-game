import { configureStore } from '@reduxjs/toolkit'

import cardsReducer from './CardSlice'


export default configureStore({
    reducer: {
        cards: cardsReducer
    }
})