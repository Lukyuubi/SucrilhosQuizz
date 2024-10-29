import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./gameOver.css";

const GameOver = () => {
    //Aqui precisamos verificar o resultado final do quizz
    const [quizState, dispatch] = useContext(QuizContext);
    let score = -1;
    if(score<=score.quizState.scoreAcao){score = score.quizState.scoreAcao;}
    if(score<=score.quizState.scoreAventura){score = score.quizState.scoreAventura;}
    if(score<=score.quizState.scoreRPG){score = score.quizState.scoreRPG;}
    if(score<=score.quizState.scoreEstrategia){score = score.quizState.scoreEstrategia;}
    if(score<=score.quizState.scorePuzzle){score = score.quizState.scorePuzzle;}
    if(score<=score.quizState.scoreTerror){score = score.quizState.scoreTerror;}
    if(score<=score.quizState.scoreFPS){score = score.quizState.scoreFPS;}

    //Fazer verificações para devolver a página final
    if(score===score.quizState.scoreAcao){
        return (
            <div id="gameover">
                <h2>Resultado Final</h2>
                <p>Seu gênero de jogo é Ação</p>
                <button onClick={() => dispatch({ type: "NEW_GAME" })}>
                    Jogar Novamente
                </button>
            </div>
        );
    }
    //Continuar com outras telas
};

export default GameOver;