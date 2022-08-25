import { createSlice } from "@reduxjs/toolkit";
import { imageCards } from "./constants";


export const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        trueCards: [],
        selectedCard: null,
        waitFlipping: false,
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
            state.selectedCard = null;
            state.waitFlipping = false;
        },
        setTrueCard: (state, action) => {
            if(state.trueCards.indexOf(action.payload) === -1) {
                state.trueCards.push(action.payload)
            }
        },
        setSelectedCard: (state, action) => {
            if(!action.payload) {   //This means game is reseted
                state.waitFlipping = false;
                state.selectedCard = null;
            }
            else if(state.selectedCard) {    //Second card
                if(state.selectedCard === action.payload) { //True choice
                    if(state.trueCards.indexOf(action.payload) === -1) {
                        state.trueCards.push(action.payload)
                    }
                }
                else {  //Wrong choice
                    state.waitFlipping = true;
                }
                state.selectedCard = null;
            }
            else {  //First card
                state.selectedCard = action.payload;
            }
        },
        stopWaitingFlipping: state => {
            state.waitFlipping = false;
        }
    }
});

export const { diceCards, setTrueCard, setSelectedCard, stopWaitingFlipping } = cardSlice.actions;

export default cardSlice.reducer;