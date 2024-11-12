import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./option";
import { motion } from "framer-motion";
import "./question.css";

//Objeto para animacoes das perguntas
const animations = [
    { x: -200, opacity: 0 }, // Desliza da esquerda
    { x: 200, opacity: 0 },  // Desliza da direita
    { y: -200, opacity: 0 }, // Desliza de cima
    { y: 200, opacity: 0 },  // Desliza de baixo
    { scale: 0, opacity: 0 } // Zoom in
];

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    if (!currentQuestion) {
        return <p>Carregando questão...</p>;
    }

    const onSelectOption = (option) => {
        dispatch({
            payload: { answer: currentQuestion.games, option },
            type: "CHANGE_QUESTION",
        });
    };

    const animationIndex = quizState.currentQuestion % animations.length;
    const animation = animations[animationIndex];
    const backgroundClass = `bg-${(quizState.currentQuestion % 3) + 1}`;

    return (
        <div className={`background-container ${backgroundClass}`}>
            <motion.div
                id="questions"
                key={quizState.currentQuestion}
                initial={animation}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p 
                id="question">
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
            </motion.div>
        </div>
    );
};

export default Question;
