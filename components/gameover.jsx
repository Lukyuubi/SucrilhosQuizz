import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import "./gameover.css";

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    // A lógica de determinar a maior pontuação
    const scores = {
        Acao: quizState.scoreAcao,
        Aventura: quizState.scoreAventura,
        RPG: quizState.scoreRPG,
        Estrategia: quizState.scoreEstrategia,
        Puzzle: quizState.scorePuzzle,
        Terror: quizState.scoreTerror,
        FPS: quizState.scoreFPS,
    };

    // Verifica se todas as pontuações são zero (caso todas as respostas tenham sido "Não")
    const allScoresAreZero = Object.values(scores).every(score => score === 0);

    // Caso o jogo tenha terminado e todas as respostas tenham sido "Não"
    if (allScoresAreZero) {
        return (
            <div id="gameoverZero">
                <h2>Resultado Final</h2>
                <p>Não conseguimos recomendar um gênero de jogo com base nas suas respostas.</p>
                <button onClick={() => dispatch({ type: "NEW_GAME" })}>
                    Jogar Novamente
                </button>
            </div>
        );
    }

    // Identifica o gênero com a maior pontuação
    const maxGenre = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    // Verifica se o jogo terminou
    if (quizState.gameStage !== "End") {
        return null; // Caso o jogo não tenha terminado, nada será renderizado
    }

    return (
        <div id="gameover">
            <h2>Resultado Final</h2>
            <p>Seu gênero de jogo é: {maxGenre}</p>
            <button onClick={() => dispatch({ type: "NEW_GAME" })}>
                Jogar Novamente
            </button>
        </div>
    );
};

export default GameOver;
