import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quiz";
import "./gameover.css";

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const [suggestedGames, setSuggestedGames] = useState([]); // Estado para armazenar os jogos sugeridos
    const [loading, setLoading] = useState(false); // Estado para indicar carregamento

    // Variavel com dados da pontuacao
    const scores = {
        Action: quizState.scoreAcao,
        Adventure: quizState.scoreAventura,
        RPG: quizState.scoreRPG,
        Strategy: quizState.scoreEstrategia,
        Puzzle: quizState.scorePuzzle,
        Terror: quizState.scoreTerror,
        Shooter: quizState.scoreFPS,
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

    //Implementacao da chamada de API 
    const fetchGames = async (genre) => {
        try {
            setLoading(true); // Inicia o estado de carregamento
            const response = await fetch(
                `https://api.rawg.io/api/games?genres=${genre}&metacritic=${90}&key=d91f15f38bfa42eca461415f1303de73`
            );
            const data = await response.json();
            setSuggestedGames(data.results.slice(0, 5)); // Armazena os 5 primeiros jogos
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    //Realiza chamada da API com o Score do quizz
    useEffect(() => {
        if (!allScoresAreZero) {
            fetchGames(maxGenre.toLowerCase()); // Chama a API com o gênero
        }
    }, [maxGenre, allScoresAreZero]);


    // Verifica se o jogo terminou
    if (quizState.gameStage !== "End") {
        return null; // Caso o jogo não tenha terminado, nada será renderizado
    }

    return (
        <div id="gameover">
            <h2>Resultado Final</h2>
            {allScoresAreZero ? (
                <p>Não conseguimos recomendar um gênero de jogo com base nas suas respostas.</p>
            ) : (
                <>
                    <p>Seu gênero de jogo é: <strong>{maxGenre}</strong></p>
                    <h3>Jogos Recomendados:</h3>
                    {loading ? (
                        <p>Carregando sugestões de jogos...</p>
                    ) : (

                        //Div para lista de jogos
                        <div className="game-list">
                            {suggestedGames.map((game) => (
                                //Card do jogo recomendado
                                <div key={game.id} className="game-card">
                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className="game-image"
                                    />
                                    <div className="game-details">
                                        <h4>{game.name}</h4>
                                        <p><strong>Metacritic:</strong> {game.metacritic}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            <button onClick={() => dispatch({ type: "NEW_GAME" })}>
                Jogar Novamente
            </button>
        </div>
    );
};

export default GameOver;
