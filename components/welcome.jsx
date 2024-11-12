import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import "./welcome.css";

const Welcome = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    console.log(quizState);

    return (
        <div id="welcome">
            <div className="content">
                <h2>Vamos descobrir possíveis jogos?</h2>
                
                <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>
                    Iniciar
                </button>
            </div>
            <footer>
                <h2>Criado por:</h2>
                <p>Nome 1</p>
                <p>Nome 2</p>
                <p>Nome 3</p>
            </footer>
            
        </div>
    );
};

export default Welcome;
