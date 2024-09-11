const quizData = [ 
    {
        question :"Lequel de ces protocoles n'existe pas ?",
        a:"FGB",
        b:"IMAP",
        c:"FTP",
        d:"DHCP",
        correct:"a",
    },
    {
        question :" Que fait la requête SQL suivante : SELECT name,age FROM person WHERE age > 18",
        a:"Elle affiche l'âge et le nom d'une personne d'ont l'age et inférieur à 18",
        b:"Elle affiche l'âge et le nom d'une personne d'ont l'age et supérieur à 18",
        c:"Elle affiche l'âge d'une personne d'ont l'age et supérieur à 18",
        d:"Elle affiche l'âge et le nom d'une personne",
        correct:"b",
    },
    {
        question :" Qu'est-ce qu'une adresse IP et quelles sont ses deux versions principales ? ",
        a:"Une adresse unique attribuée à chaque périphérique connecté à un réseau.",
        b:"IPv4 et IPv6",
        c:"Les deux réponses ci-dessus sont correctes.",
        d:"IPv2 et IPv3",
        correct:"c",
    },
    {
        question :"Qu'est-ce qu'une fonction et pourquoi est-elle utilisée en programmation ?",
        a:"Une fonction est un bloc de code réutilisable qui effectue une tâche spécifique.",
        b:"Les fonctions ne sont pas utilisées en programmation.",
        c:"Les fonctions sont utilisées uniquement pour afficher des messages à l'écran.",
        d:"Aucune de ces reponses",
        correct:"a",
    }
];
const quiz = document.getElementById("container-questions");
const reponseElement = document.querySelectorAll(".reponse");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const EnvoieBouton = document.getElementById("valider");
const rejouerButton = document.getElementById("rejouer-button"); // Select the rejouer button

let currentQuiz = 0;
let score = 0;

const deselectReponse = () => {
    reponseElement.forEach((reponse)=> (reponse.checked = false));
};

const getSelected = () => {
    let reponse;
    reponseElement.forEach((reponseElement)=>{
        if(reponseElement.checked) reponse = reponseElement.id;
    });
    return reponse;
};
const nbQuestionElement = document.getElementById("nb-question"); // Référence à l'élément avec l'ID "nb-question"

const chargerQuiz = () => {
    deselectReponse();
    if (currentQuiz < quizData.length) {
        const currentQuizData = quizData[currentQuiz];
        questionElement.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
        nbQuestionElement.innerText = `Question ${currentQuiz + 1} sur ${quizData.length}`;

    } else {
        quiz.style.display = "none"; 
        if (currentQuiz === quizData.length) {
            const resultatFinal = document.getElementById("resultatFinal");
            resultatFinal.innerText = `Votre score final est de ${score}/${quizData.length}`;
            const rejouerButton = document.getElementById("rejouer-button");
            rejouerButton.style.display = "block"; 
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

var timerElement = setInterval(function(){
    temps--;
    timerElementtext.innerText = temps;
    if (temps==0){
        alert("Perdue !");
        window.location.href = "file:///c%3A/Users/meggr/OneDrive/Bureau/portfolio/quizz/quizz.html";
    }

},1000
);
