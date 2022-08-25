import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { diceCards, setSelectedCard, setTrueCard, stopWaitingFlipping } from './app/CardSlice';
import FlipCard from './components/FlipCard/FlipCard';

function App() {

  const [resetGame, setResetGame] = useState(true);
  const [finish, setFinish] = useState(false);
  const cards = useSelector(state => state.cards.cards)
  const trueCards = useSelector(state => state.cards.trueCards)
  const waitFlipping = useSelector(state => state.cards.waitFlipping);

  const dispatch = useDispatch();

  useEffect(() => {
    if(resetGame === true) {
      setTimeout(() => {
        dispatch(diceCards());
        setResetGame(false);
      }, 500);
    }
  }, [resetGame])

  useEffect(() => {
    if(trueCards.length > 0 && trueCards.length >= cards.length / 2) {
      setTimeout(() => {
        setFinish(true);
      }, 1200);
    }
  }, [trueCards])

  useEffect(() => {
    if(waitFlipping) {
      setTimeout(() => {
        dispatch(stopWaitingFlipping());
      }, 700);
    }
  }, [waitFlipping]);

  const onResetButtonClicked = () => {
    dispatch(setSelectedCard(null));
    setFinish(false);
    setResetGame(true);
  }

  return (
    <div className='main-container main-div' >
      <div className='control-panel' >
        <button type='button' className='resetButton' onClick={onResetButtonClicked} >
          <span >Reset Game</span>
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
