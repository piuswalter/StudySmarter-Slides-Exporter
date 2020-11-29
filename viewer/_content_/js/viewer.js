let courses;
let flashcards;
let card = 0;

fetch('./studysmarter.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        courses = data;
        let selector = document.getElementById("course-selector");
        let i = 0;
        courseNames = Object.keys(courses);
        for (i = 0; i < courseNames.length; i++) {
            let option = document.createElement('option');
            option.text = courseNames[i];
            selector.add(option, selector[i]);
        }
        changeCourse(courseNames[0]);
    });

function changeCourse(course) {
    flashcards = courses[course];
    renderCard();
}

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
