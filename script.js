const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/vilao.png', 'img/vilao2.png', 'img/vilao3.png']

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
    if(topPosition <= "0px"){
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
    if(topPosition >= "510px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

// funcionalidade
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/tiro.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(()=>{
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if(checkLaserColision(laser, alien)){
                alien.src = 'explosion.png';
                alien.classList.remove('alien')
                alien.classList.add('dead-alien');
            }
        });
        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

// função para criar inimigos aleatórios
function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random()*aliensImg.length)]; // sorteio dos aliens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random()*330)+ 30}px`;
    playArea.appendChild(newAlien)
    moveAlien(newAlien)
}

// função para movimentar aliens
function moveAlien(alien){
    let moveAlienInterval = setInterval(()=>{
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30)
}

// função para colisão
function checkLaserColision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 20;
    if(laserLeft !== 340 && laserLeft + 40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

window.addEventListener('keydown', flyShip)