const cardTemplate = document.getElementById('cardTemplate').content;
const fragment = document.createDocumentFragment();
const mainContainer = document.getElementById('card');
const scoreButtonsContainer = cardTemplate.getElementById('buttonContainer');
const btnSubmit = cardTemplate.getElementById('btnSubmit');
let scoreSelected;
let areColored = 0;
const scoreChose = [];

document.addEventListener('DOMContentLoaded', () => loadFirstCard());

const loadFirstCard = () => {
    cardTemplate.getElementById('cardImage').setAttribute('src', './images/icon-star.svg');
    cardTemplate.getElementById('cardImage').setAttribute('alt', 'little orange star');

    cardTemplate.getElementById('displayScore').style.display = 'none';

    cardTemplate.getElementById('cardTitle').textContent = 'How did we do?';
    cardTemplate.getElementById('cardParagraph').textContent = 'Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!';

    const buttonContainer = cardTemplate.getElementById('buttonContainer');
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('card__btn__ratio');
        btn.setAttribute('id', i);
        buttonContainer.appendChild(btn);
    }

    const cloneTemplate = cardTemplate.cloneNode(true);
    fragment.appendChild(cloneTemplate);

    mainContainer.appendChild(fragment);
}

const loadSecondCard = () => {
    if(scoreSelected !== undefined) {
        mainContainer.innerHTML = '';
        cardTemplate.getElementById('cardImage').setAttribute('src', './images/illustration-thank-you.svg');
        cardTemplate.getElementById('cardImage').setAttribute('alt', 'cellphone with a credit card');
        cardTemplate.getElementById('cardImage').classList.remove('card__img-principal');
        cardTemplate.getElementById('cardImage').classList.add('self__center');
    
        cardTemplate.getElementById('scoreChose').textContent = scoreSelected;
        cardTemplate.getElementById('displayScore').style.display = 'inline';
        cardTemplate.getElementById('displayScore').classList.add('self__center');
    
        cardTemplate.getElementById('cardTitle').textContent = 'Thank you!';
        cardTemplate.getElementById('cardTitle').classList.add('self__center');
    
        cardTemplate.getElementById('cardParagraph').textContent = 'We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!';
        cardTemplate.getElementById('cardParagraph').classList.add('self__center');
    
        const buttonContainer = cardTemplate.getElementById('buttonContainer');
        buttonContainer.parentNode.removeChild(buttonContainer);
        btnSubmit.parentNode.removeChild(btnSubmit);
        
        const cloneTemplate = cardTemplate.cloneNode(true);
        fragment.appendChild(cloneTemplate);
    
        mainContainer.appendChild(fragment);
    } else {
        alert('You have to choose a score!')
    }

}


mainContainer.addEventListener('click', e => {
    getButtons(e);
});

const getButtons = e => {
    if (e.target.classList.contains('card__btn__ratio')) {
        getScore(e.target);
        changeColor(e.target.parentElement);
    } else if (e.target.id === 'btnSubmit') {
        loadSecondCard();
    }
    e.stopPropagation();
}

const getScore = element => {
    scoreSelected = parseInt(element.id);
}

const changeColor = parentElement => {
    const scoreButtons = parentElement.children;

    scoreChose.push(scoreSelected);
    console.log(scoreChose[scoreChose.length - 1]);

    if (areColored === 0 && scoreButtons[scoreSelected - 1].id !== scoreChose[scoreChose.length - 1]) {
        addColor(scoreButtons);
    } else {
        deleteColor(scoreButtons);
        addColor(scoreButtons);
    }
}

const addColor = buttons => {
    if (buttons[scoreSelected - 1] !== undefined) {
        buttons[scoreSelected - 1].style.backgroundColor = 'hsl(25, 97%, 53%)';
        buttons[scoreSelected - 1].style.color = 'hsl(0, 0%, 100%)';
    }

    if (buttons[scoreSelected - 2] !== undefined) {
        buttons[scoreSelected - 2].style.backgroundColor = 'hsl(217, 12%, 63%)';
        buttons[scoreSelected - 2].style.color = 'hsl(0, 0%, 100%)';
    }
    areColored = 1;
}

const deleteColor = buttons => {
    for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.style.backgroundColor = 'hsl(213, 19%, 21%)';
        element.style.color = 'hsl(217, 12%, 63%)';
    }

    areColored = 0;
}