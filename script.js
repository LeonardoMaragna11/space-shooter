const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-game');

// movimento e tiro
function flyShip(event){
    if(event.key == 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key == 'ArrowDown'){
        event.preventDefault();
        moveDown();
    } else if(event.key == ' '){
        event.preventDefault();
        fireLaser();
    }
}

// função subir 
function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition == "0px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

// fução de descer
function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition == "540px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

window.addEventListener('keydown', flyShip)