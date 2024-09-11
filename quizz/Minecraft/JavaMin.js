
const quizData = [ 
    {
        question :" Combien de blocs de cobblestone sont nécessaires pour fabriquer un four dans Minecraft ? ",
        a:"4",
        b:"8",
        c:"12",
        d:"10",
        correct:"b",
    },
    {
        question :" Combien existe-t-il de laine de couleur ? ",
        a:"16",
        b:"10",
        c:"5",
        d:"8",
        correct:"a",
    },
    {
        question :" En combien de seconde casse t-on un bloc de bois (à la main !) ? ",
        a:"7 secondes",
        b:"2 secondes",
        c:"3 secondes",
        d:"8 secondes",
        correct:"c",
    },
    {
        question :" Quel est le nom de la structure générée naturellement dans le monde de l'End, composée de plusieurs îles flottantes ? ",
        a:"End Fortress",
        b:"End Stronghold",
        c:"End City",
        d:"End Gateway",
        correct:"c",
    },
    {
        question :" Combien de blocs de minerai de diamant peuvent être générés dans un même gisement naturel dans Minecraft ? ",
        a:"Jusqu'à 4",
        b:"Jusqu'à 8",
        c:"Jusqu'à 12",
        d:"Jusqu'à 16",
        correct:"a",
    },
    {
        question :" Quelle est la seule manière légitime d'obtenir de la tête de Wither Skeleton dans Minecraft ? ",
        a:"Les tuer avec une épée enchantée",
        b:"Utiliser une potion de chance",
        c:"Faire exploser des creuseurs dans le Nether",
        d:"Utiliser une épée enchantée avec Looting",
        correct:"b",
    },
    {
        question :" Comment s'appelle le créateur de Minecraft ? ",
        a:"Steve Jobs",
        b:"Bill Gates",
        c:"Markus Persson",
        d:"Elon Musk",
        correct:"c",
    }, 
    {
        question :" Quel bloc est nécessaire pour créer un portail vers l'End dans Minecraft ? ",
        a:"Bloc de diamant",
        b:"Bloc de laine",
        c:"Bloc d' obsidienne",
        d:"Bloc de pierre naturelle",
        correct:"c",
    }
] 
const quiz = document.getElementById("container-questions"); // Changed id from "quiz" to "container-questions"
const reponseElement = document.querySelectorAll(".reponse");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const EnvoieBouton = document.getElementById("valider");

let currentQuiz = 0;
let score = 0;


const deselectReponse = () => { // Corrected typo from deselectreponse to deselectReponse
    reponseElement.forEach((reponse)=> (reponse.checked = false));
};

const getSelected = () => {
    let reponse;
    reponseElement.forEach((reponseElement)=>{
        if(reponseElement.checked) reponse = reponseElement.id;
    });
    return reponse;
}
const nbQuestionElement = document.getElementById("nb-question"); // Référence à l'élément avec l'ID "nb-question"


const chargerQuiz = () => {
    deselectReponse();
    if (currentQuiz < quizData.length) {
        const currentQuizData = quizData[currentQuiz];
        questionElement.innerHTML = `<p>${currentQuizData.question}</p>`;
        if (currentQuizData.image) {
            // Si une image est définie pour cette question, l'afficher
            questionElement.innerHTML += `<img src="${currentQuizData.image}" alt="Image de la question">`;
        }
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
        nbQuestionElement.innerText = `Question ${currentQuiz + 1} sur ${quizData.length}`;
    } else {
        quiz.style.display = "none"; // Hide the quiz container
        if (currentQuiz === quizData.length) {
            const resultatFinal = document.getElementById("resultatFinal");
            resultatFinal.innerText = `Votre score final est de ${score}/${quizData.length}`;
            const rejouerButton = document.getElementById("rejouer-button");
            rejouerButton.style.display = "block"; // Show the rejouer button if all questions are answered
        }
    }
};

chargerQuiz();



EnvoieBouton.addEventListener("click", () => {
    const reponse = getSelected();
    if (reponse) {
        if (reponse === quizData[currentQuiz].correct) score++;
        currentQuiz++;
        chargerQuiz();
    }
});


window.addEventListener('DOMContentLoaded', (event) => {
    var audio = document.querySelector('audio');
    audio.play();
});

let temps = 30;
const timerElementtext = document.getElementById("timer")
timerElementtext.innerText = temps;
alert("Vous avez 30 secondes pour repondres aux questions") //alert
screenLeft
var timerElement = setInterval(function(){
    temps--;
    timerElementtext.innerText = temps;
    if (temps==0){
        alert("Perdue !");  //alert
        window.location.href = "file:///c%3A/Users/meggr/OneDrive/Bureau/portfolio/quizz/quizz.html";
    }
},1000
);

