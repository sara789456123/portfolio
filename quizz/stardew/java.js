
const quizData = [ 
    {
        question :"Comment s'appelle le maire de Stardew Valley ? ",
        a:"Kent",
        b:"Lewis",
        c:"Clark",
        d:"Linus",
        correct:"b",
    },
    {
        question :" Ou shane travaille ? ",
        a:"Marché Joja",
        b:"Hopital",
        c:"Bar",
        d:"Il ne travaille pas",
        correct:"a",
    },
    {
        question :"Combien de temps met un arbre à pousser ? ",
        a:"15 jours",
        b:"20 jours",
        c:"28 jours",
        d:"0 mdr ça existe pas !",
        correct:"c",
    },
    {
        question :" Qui vous donne le choix d'adopter un animal au début du jeu ?",
        a:"Abigail",
        b:"Caroline",
        c:"Marnie",
        d:"SEBASTIAN !(le bebou)",
        correct:"c",
    },
    {
        question :" Au bout de combien de cœur peut-on se marier avec un pnj ? ",
        a:"15",
        b:"10",
        c:"1000 (jamais)",
        d:"12",
        correct:"b",
    },
    {
        question :" Comment s'appelle le gérant du marché joja ? ",
        a:"Morris",
        b:"Albert",
        c:"Joja",
        d:"Nicolas",
        correct:"a",
    },
    {
        question :" Combien y a-t-il de noix de coco dorée sur l'île Gingembre ? ",
        a:"100",
        b:"80",
        c:"130",
        d:"90",
        correct:"c",
    },
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

