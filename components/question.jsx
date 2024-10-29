import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./option";
import "./question.css";

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    console.log(quizState);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    if(!currentQuestion){
        return <p>Carregando questão</p>
    }

    const onSelectOption = (option) => {
        dispatch({
            payload: { answer: currentQuestion.games, option },
            type: "CHANGE_QUESTION",
        });
    };

    return (
        <div id="questions">
            <p id="question">
                Pergunta {quizState.currentQuestion + 1} de{" "}
                {quizState.questions.length}
            </p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
                {currentQuestion.options.map((option) => (
                    <Option
                        option={option}
                        key={option}
                        answer={currentQuestion.games}
                        selectOption={() => onSelectOption(option)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;