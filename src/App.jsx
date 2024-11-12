import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";

import Welcome from "../components/welcome";
import Question from "../components/question";
import GameOver from "../components/gameover";

import "./App.css";
    
function App() {
    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <>  
            {quizState.gameStage === "Start" && <Welcome />}
            {quizState.gameStage === "Playing" && <Question />}
            {quizState.gameStage === "End" && <GameOver />}
        </>
    );
}

export default App;