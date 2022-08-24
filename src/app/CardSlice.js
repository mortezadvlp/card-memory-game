import { createSlice } from "@reduxjs/toolkit";
import { imageCards } from "./constants";


export const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        trueCards: []
    },
    reducers: {
        diceCards: state => {
            state.trueCards.length = 0;
            state.trueCards = [];
            var rndArr = [];
            var len = imageCards.length * 2;
            while(rndArr.length < len){
                var r = Math.floor(Math.random() * len);
                if(r === len) {
                    r--;
                }
                if(rndArr.indexOf(r) === -1) rndArr.push(r);
            }
            for (let i = 0; i < len; i++) {
                let rndIndex = rndArr[i];
                state.cards[i] = imageCards[Math.floor(rndIndex/2)];
            }
        },
        setTrueCard: (state, action) => {
            if(state.trueCards.indexOf(action.payload) === -1) {
                state.trueCards.push(action.payload)
            }
        }
    }
});

export const { diceCards, setTrueCard } = cardSlice.actions;

export default cardSlice.reducer;