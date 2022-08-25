
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCard } from "../../app/CardSlice";
import "./FlipCard.css"

export default function FlipCard({ cardId = "back.png", trueCard = false, resetMode = false }) {

    const [flipCardClickClass, setFlipCardClickClass] = useState("");
    const [congrats, setCongrats] = useState(false);
    const [clickedOnce, setClickedOnce] = useState(false);

    const dispatch = useDispatch();

    const waitFlipping = useSelector(state => state.cards.waitFlipping);

    const frontCard = require("../../images/front.png");
    const backCard = require("../../images/" + cardId);

    useEffect(() => {
        if(!waitFlipping && !trueCard) {
            setFlipCardClickClass("");
            setClickedOnce(false);
        }
    }, [waitFlipping, trueCard])

    useEffect(() => {
        if(trueCard) {
            setCongrats(true);
        }
    }, [trueCard])

    useEffect(() => {
        if(resetMode === true) {
            setFlipCardClickClass("");
            setCongrats(false);
            setClickedOnce(false)   ;
        }
    }, [resetMode])

    const flipCardClicked = () => {
        if(!trueCard && !waitFlipping && !clickedOnce) {
            setFlipCardClickClass("flip-card-click");
            setClickedOnce(true);
            dispatch(setSelectedCard(cardId))
        }
    }

    return (
        <div className={`flip-card ${flipCardClickClass}`} onClick={flipCardClicked} >
            <div className="flip-card-inner" >
                <div className="flip-card-front" >
                    <img className="card-image" src={frontCard} alt="front.png" />
                </div>
                <div className="flip-card-back" >
                    <img className="card-image" src={backCard} alt="back.png" />
                </div>
            </div>
            {congrats &&
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            }
        </div>
    );
}