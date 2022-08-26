import { createSlice } from "@reduxjs/toolkit";
import { imageCards } from "./constants";


export const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        trueCards: [],
        selectedCard: null,
        waitFlipping: false,
        statistical: {
            moveCount: 0,
            accuracy: 0,
            time: 0,
            bestMoveCount: "-",
            bestAccuracy: "-",
            bestTime: "-"
        },
    },
    reducers: {
        diceCards: (state, action) => { //action.payload = save Bests
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
            if(action.payload) {
                state.statistical = {
                    ...state.statistical,
                    bestMoveCount: state.statistical.bestMoveCount === "-" ? state.statistical.moveCount : Math.min(state.statistical.bestMoveCount, state.statistical.moveCount),
                    bestAccuracy: state.statistical.bestAccuracy === "-" ? state.statistical.accuracy : Math.max(state.statistical.bestAccuracy, state.statistical.accuracy),
                    moveCount: 0,
                    accuracy: 0,
                }
            }
            else {
                state.statistical = {
                    ...state.statistical,
                    moveCount: 0,
                    accuracy: 0,
                }
            }
        },
        setTrueCard: (state, action) => { //action.payload = new trueCard
            if(state.trueCards.indexOf(action.payload) === -1) {
                state.trueCards.push(action.payload)
            }
        },
        setSelectedCard: (state, action) => { //action.payload = selected card
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
                state.statistical.moveCount = state.statistical.moveCount + 1;
                state.statistical.accuracy = Math.round(100.0*state.trueCards.length / state.statistical.moveCount)
            }
            else {  //First card
                state.selectedCard = action.payload;
            }
        },
        stopWaitingFlipping: state => {
            state.waitFlipping = false;
        },
        setBestTime: (state, action) => { //action.payload = ellapsed time
            state.statistical = {
                ...state.statistical,
                bestTime: action.payload === 0 ? "-" : state.statistical.bestTime === "-" ? action.payload : Math.min(state.statistical.bestTime, action.payload),
            }
        }
    }
});

export const { diceCards, setTrueCard, setSelectedCard, stopWaitingFlipping, setBestTime } = cardSlice.actions;

export default cardSlice.reducer;