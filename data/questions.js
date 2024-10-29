//Escrevam perguntas e respostas para o quizz 
//Objetos para perguntas respostas e pontuação da resposta
//Cada objeto é uma pergunta com suas respectivas respostas e pontuações
//Cada resposta gera pontuação para os jogos que definimos

const data = [
    {
        question: "Você joga LoL?",
        options: ["Sim",
                "Não"
            ],
        games: {
            Acao: '1',
            Aventura: '0',
            RPG: '0',
            Estrategia: '1',
            Puzzle: '0',
            Terror: '0',
            FPS: '0',
        },

        question: "Você joga Minecraft?",
        options: ["Sim",
                "Não"
            ],
        games: {
            Acao: '0',
            Aventura: '1',
            RPG: '0',
            Estrategia: '0',
            Puzzle: '0',
            Terror: '0',
            FPS: '0',
        },

        //Replique o objeto acima para adicionar mais perguntas
        //Exemplo:
        //Question: 'Você gosta de jogos de tiro?'
        //Options: ['Sim', 'Não']
        //Games: {Acao: 1, 
        //        Aventura: 0,
        //        RPG: 0,
        //        Estrategia: 0,
        //        Puzzle: 0,
        //        Terror: 0,
        //        FPS: 1,
        //    },
    },
];

export default data;