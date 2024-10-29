import { useContext } from "react";
import { QuizContext } from "../context/quiz";

//import cabins from "../img/cabins.webp";

import "./welcome.css";

const Welcome = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    console.log(quizState);
    return (
        <>
            <div id="welcome">
                <h2>Vamos descobrir possíveis jogos?</h2>
                <img
                    //src={}
                    alt="Foto de jogos feras"
                />
                <p>Clique no botão abaixo e descubra!</p>
                <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>
                    Iniciar
                </button>
            </div>
        </>
    );
};

export default Welcome;