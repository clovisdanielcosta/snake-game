let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction="right";

// Setando a posição inicial da comidinha 
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box

}
function createBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake(){
    for (i = 0; i < snake.length; i++) {
        // Cor dos gomos ímpares da cobrinha
        context.fillStyle = "green"; 
        // Cor dos gomos pares da cobrinha
        if (i % 2 == 0) context.fillStyle = "lightgreen"; 	
        // Cor da cabeça da cobrinha
        if (i == 0) context.fillStyle = "lime";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {

    // Cobrinha fora do contexto
    if (snake[0].x > 15 * box && direction == "right" 
        || snake[0].x < 0  && direction == "left" 
        || snake[0].y > 15 * box && direction == "down" 
        || snake[0].y < 0 && direction == "up") 
    { 
        // Ignora ações das teclas até voltar para o contexto
    }
    else {
        // Altera a direção pelas teclas
        if (event.keyCode == 37 && direction != "right") direction = "left";
        if (event.keyCode == 38 && direction != "down") direction = "up";
        if (event.keyCode == 39 && direction != "left") direction = "right";
        if (event.keyCode == 40 && direction != "up") direction = "down";
    }
}

function startPlay() {
    // Altera a direção para não deixar sumir a cobrinha
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0; 
    if (snake[0].x < 0  && direction == "left") snake[0].x = 16 * box; 
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0; 
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 

    // Fim do game
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over! :(')
        }
    }

    createBG();
    createSnake();
    createFood();

    // Pegando a posição da cabeça da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Fazendo a cobrinha andar colorindo a frente e apagando atrás
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let game = setInterval(startPlay, 150);
