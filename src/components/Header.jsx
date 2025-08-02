import {useState,useEffect} from "react";
import "../styles/Header.css";

const TITLE = "PokemonMemo";

function Header({currentStreak,highestStreak}) {
    
    return (
        <>
            <div id = "horizontalTop">
                <h1 id = "gameTitle">{TITLE}</h1>
                <div id = "scoreBox">
                    <div className = "score">Current score : {currentStreak}</div>
                    <div  className = "score">Best score : {highestStreak}</div>  
                </div> 
            </div> 
            <div id = "how">Get points by clicking on an image but don't click on any more than once!</div>
        </>
    )
}

export default Header;