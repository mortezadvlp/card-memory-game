import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { diceCards, setBestTime, stopWaitingFlipping } from './app/CardSlice';
import FlipCard from './components/FlipCard/FlipCard';
import InfoItem from './components/InfoItem/InfoItem';

function App() {

  const [resetGame, setResetGame] = useState(true);
  const [finish, setFinish] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(-1);
  const [ellapsedTime, setEllapsedTime] = useState(0);
  const cards = useSelector(state => state.cards.cards)
  const trueCards = useSelector(state => state.cards.trueCards)
  const waitFlipping = useSelector(state => state.cards.waitFlipping);
  const statistical = useSelector(state => state.cards.statistical);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if(!finish) {
        setEllapsedTime(ellapsedTime + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ellapsedTime])

  useEffect(() => {
    if(resetGame === true) {
      setRoundsPlayed(roundsPlayed + 1)
      finish&& dispatch(setBestTime(ellapsedTime));
      setTimeout(() => {
        dispatch(diceCards(finish));
        setResetGame(false);
        setFinish(false);
        setEllapsedTime(0);
      }, 500);
    }
  }, [resetGame])

  useEffect(() => {
    if(trueCards.length > 0 && trueCards.length >= cards.length / 2) {
      setTimeout(() => {
        setFinish(true);
      }, 1200);
    }
  }, [trueCards]);

  useEffect(() => {
    if(waitFlipping) {
      setTimeout(() => {
        dispatch(stopWaitingFlipping());
      }, 700);
    }
  }, [waitFlipping]);

  const onResetButtonClicked = () => {
    setResetGame(true);
  }

  return (
    <div className='main-container main-div' >
      <h1 className='text-center' >Card Memory Game</h1>
      <div className='contact-info' >
        <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
        </svg>
        <a href='https://github.com/mortezadvlp/card-memory-game' >https://github.com/mortezadvlp/card-memory-game</a>
      </div>
      <div className='control-panel' >
        <div className='info-panel' >
          <InfoItem title="Rounds Played" value={roundsPlayed} />
          <InfoItem title="Move" value={statistical.moveCount} best={statistical.bestMoveCount} />
          <InfoItem title="Accuracy" value={`${statistical.accuracy}%`} best={`${statistical.bestAccuracy}%`} />
          <InfoItem title="Time" value={`${ellapsedTime}s`} best={`${statistical.bestTime}s`} />
        </div>
        <button type='button' className='resetButton' onClick={onResetButtonClicked} >
          <span >{finish ? 'Play Again' : 'Reset Game'}</span>
          <img src={require("./images/reset.png")} alt='reset' />
        </button>
      </div>
      <div className="holder">
        {cards.map((card, index) => 
          <FlipCard key={index} cardId={card} trueCard={trueCards.indexOf(card) > -1} resetMode={resetGame} />
        )}
        {finish && 
        <div className='congrats-holder' >
          <div className='congrats' >
            <span className='congrats-text' >Congrats</span>
          </div>
        </div>
        }
      </div>
    </div>
    
  );
}

export default App;
