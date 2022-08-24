
import { useEffect, useState } from "react";
import "./FlipCard.css"

export default function FlipCard({ cardId = "back.png", hideBack = false, trueCard = false, canClick = true, resetMode = false, onClick }) {

    const [flipCardClickClass, setFlipCardClickClass] = useState("");
    const [congrats, setCongrats] = useState(false);
    const [clickedOnce, setClickedOnce] = useState(false);

    const frontCard = require("../../images/front.png");
    const backCard = require("../../images/" + cardId);

    useEffect(() => {
        if(hideBack & !trueCard) {
            setFlipCardClickClass("");
            setClickedOnce(false);
        }
    }, [hideBack])

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
        if(!trueCard && canClick && !clickedOnce) {
            setFlipCardClickClass("flip-card-click");
            setClickedOnce(true);
            onClick(cardId);
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