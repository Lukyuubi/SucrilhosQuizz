import { createContext, useReducer } from "react";
import questions from "../data/questions";

//Vetor de estágios do jogo
const STAGES = ["Start", "Playing", "End"];

//Estado inicial do jogo
const initialState = {
    // Pos0 = Start, Pos1 = Playing, Pos2 = End
    gameStage: STAGES[0], // Aqui estamos dizendo que o jogo começa no estágio "Start"
    currentQuestion: 0, // Aqui estamos dizendo que a primeira pergunta é a de índice 0
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
                gameStage: STAGES[1],
            };

        case "CHANGE_QUESTION":
            const option = action.payload.option;
            const answerAcao = action.payload.answer.Acao;
            const answerAventura = action.payload.answer.Aventura;
            const answerRPG = action.payload.answer.RPG;
            const answerEstrategia = action.payload.answer.Estrategia;
            const answerPuzzle = action.payload.answer.Puzzle;
            const answerTerror = action.payload.answer.Terror;
            const answerFPS = action.payload.answer.FPS;

            let Acao = 0;
            let Aventura = 0;
            let RPG = 0;
            let Estrategia = 0;
            let Puzzle = 0;
            let Terror = 0;
            let FPS = 0;

            if (answerAcao === option) Acao = 1;
            if (answerAventura === option) Aventura = 1;
            if (answerRPG === option) RPG = 1;
            if (answerEstrategia === option) Estrategia = 1;
            if (answerPuzzle === option) Puzzle = 1;
            if (answerTerror === option) Terror = 1;
            if (answerFPS === option) FPS = 1;

            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;
            if (!questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                scoreAcao: state.scoreAcao + Acao,
                scoreAventura: state.scoreAventura + Aventura,
                scoreRPG: state.scoreRPG + RPG,
                scoreEstrategia: state.scoreEstrategia + Estrategia,
                scorePuzzle: state.scorePuzzle + Puzzle,
                scoreTerror: state.scoreTerror + Terror,
                scoreFPS: state.scoreFPS + FPS,
                gameStage: endGame ? STAGES[2] : state.gameStage,
            };

        case "NEW_GAME":
            return initialState;

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