import { createContext, useReducer } from "react";
import questions from "../data/questions";

// Vetor de estágios do jogo
const STAGES = ["Start", "Playing", "End"];

// Estado inicial do jogo
const initialState = {
    gameStage: STAGES[0], // O jogo começa no estágio "Start"
    currentQuestion: 0,
    scoreAcao: 0,
    scoreAventura: 0,
    scoreRPG: 0,
    scoreEstrategia: 0,
    scorePuzzle: 0,
    scoreTerror: 0,
    scoreFPS: 0,
    questions,
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1], // Muda para o estágio "Playing"
            };

        case "CHANGE_QUESTION":
            const option = action.payload.option; // Opção selecionada
            const { Acao, Aventura, RPG, Estrategia, Puzzle, Terror, FPS } = action.payload.answer;

            // Verifica se a opção selecionada foi "Sim"; caso contrário, não adiciona pontos
            const increment = option === "Sim" ? 1 : 0;

            const nextQuestion = state.currentQuestion + 1;
            const endGame = nextQuestion >= state.questions.length;

            return {
                ...state,
                currentQuestion: endGame ? state.currentQuestion : nextQuestion,
                scoreAcao: state.scoreAcao + (increment * Acao),
                scoreAventura: state.scoreAventura + (increment * Aventura),
                scoreRPG: state.scoreRPG + (increment * RPG),
                scoreEstrategia: state.scoreEstrategia + (increment * Estrategia),
                scorePuzzle: state.scorePuzzle + (increment * Puzzle),
                scoreTerror: state.scoreTerror + (increment * Terror),
                scoreFPS: state.scoreFPS + (increment * FPS),
                gameStage: endGame ? STAGES[2] : state.gameStage,
            };

            console.log("Pontuação Atual:");
            console.log("Ação:", updatedState.scoreAcao);
            console.log("Aventura:", updatedState.scoreAventura);
            console.log("RPG:", updatedState.scoreRPG);
            console.log("Estratégia:", updatedState.scoreEstrategia);
            console.log("Puzzle:", updatedState.scorePuzzle);
            console.log("Terror:", updatedState.scoreTerror);
            console.log("FPS:", updatedState.scoreFPS);

        case "NEW_GAME":
            // Retorna uma cópia do estado inicial
            return {
                ...initialState,
                questions: [...initialState.questions],
            };

        default:
            return state;
    }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
};
