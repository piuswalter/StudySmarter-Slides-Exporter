let flashcards;
let card = 2;

fetch('./studysmarter.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        flashcards = data;
        renderCard();
    });

function renderCard() {
    document.getElementById('question').innerHTML = flashcards[card].question;
}

function setAnswer(text) {
    document.getElementById('answer').innerHTML = text;
}

function revealAnswer() {
    setAnswer(flashcards[card].answer);
}

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

function switchCard(inc) {
    if (!inc) inc = randomNumber(1,flashcards.length -1);
    card = (card + inc) % flashcards.length;
    if (card < 0) card = flashcards.length -1;
    setAnswer('');
    renderCard();
}
