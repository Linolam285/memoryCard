import {useState,useEffect} from "react";
import "../styles/Game.css";

const BASEURL = "https://pokeapi.co/api/v2/pokemon?";
const NUMBERPOKEMONS = 10;

function Game({sendData}) {

    const [cardsList,setCardsList] = useState([]); //cards url list (images)

    const [currentStreak,setCurrentStreak] = useState(0);
    const [highestStreak,setHighestStreak] = useState(0);

    const [imagesClicked,setImagesClicked] = useState([]);

    useEffect(() => {
        if (currentStreak > highestStreak) {
            setHighestStreak(currentStreak);
        }
    }, [currentStreak,highestStreak]);

    useEffect(() => {
        const fetchPokemons = async() => {
            try {
                const promises = [];
                for (let i = 1; i < 11; i++) {
                    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then(res => res.json()));
                }
                const results = await Promise.all(promises);
                const newCards = results.map(data => data.sprites.other['official-artwork'].front_default);
                setCardsList(newCards);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemons();
    }, [])

    const shuffleCards = () => {
        let newList = [];
        let usedIndexs = [];
        while (newList.length < 10) {
            let randomIndex = Math.floor(Math.random() * 10);
            if (!usedIndexs.includes(randomIndex)) {
                newList.push(cardsList[randomIndex]);
                usedIndexs.push(randomIndex);
            }
        }
        setCardsList(newList);
    }

    const handleClick = (e) => {
        let id = e.currentTarget.dataset.id;
        let streak;
        let newHighestStreak;
        if (!imagesClicked.includes(id)) {
            setImagesClicked([...imagesClicked,id]);
            streak = currentStreak+1;
            setCurrentStreak(streak);
            shuffleCards();
        } else {
            streak = 0;
            setCurrentStreak(0);
            setImagesClicked([]);
        }
        newHighestStreak = streak > highestStreak ? streak : highestStreak;
        sendData({
                currentStreak:streak,
                highestStreak:newHighestStreak
        });
        
    }
    
    return (
        <>
            <div className="cardsGrid">
                {
                    cardsList.map((cardUrl,index) => {
                        let i = index + 1;
                        return <div onClick = {handleClick} tabIndex="0" role="button" className = "pokemonCard" key = {index} data-id = {cardUrl}>
                            <img src={cardUrl} alt={"pokemon numéro " + i} />
                        </div>
                    })
                }
            </div>
        </>
    )
    
}

export default Game;