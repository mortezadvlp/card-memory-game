import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { diceCards, setTrueCard } from './app/CardSlice';
import FlipCard from './components/FlipCard/FlipCard';

function App() {

  const [wrongCard, setWrongCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [canClick, setCanClick] = useState(true);
  const [resetGame, setResetGame] = useState(true);
  const [finish, setFinish] = useState(false);
  const cards = useSelector(state => state.cards.cards)
  const trueCards = useSelector(state => state.cards.trueCards)

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
      }, 1500);
    }
  }, [trueCards])

  const cardClicked = (cardId) => {
    if(selectedCard !== "" && cardId === selectedCard) {
      setSelectedCard("");
      dispatch(setTrueCard(cardId));
    }
    else if(selectedCard === "") {
      setSelectedCard(cardId);
    }
    else {
      setSelectedCard("");
      setCanClick(false);
      setWrongCard(false);
      setTimeout(() => {
        setWrongCard(true)
        setCanClick(true);
      }, 1000);
    }
  }

  const onButtonClicked = () => {
    setWrongCard(true);
    setSelectedCard("");
    setCanClick(true);
    setFinish(false);
    setResetGame(true);
  }

  return (
    <div className='main-container main-div' >
      <div className='control-panel' >
        <button type='button' className='resetButton' onClick={onButtonClicked} >
          <span >Reset Game</span>
          <img src={require("./images/reset.png")} alt='reset' />
        </button>
      </div>
      <div className="holder">
        {cards.map((card, index) => 
          <FlipCard key={index} cardId={card} hideBack={wrongCard} trueCard={trueCards.indexOf(card) > -1}
            canClick={canClick} resetMode={resetGame} onClick={cardClicked} />
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
