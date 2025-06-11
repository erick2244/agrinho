 
let fruits = [];
let score = 0;
let lives = 3;
let gameOver = false;

const fruitTypes = [
  { color: 'red', size: 30, points: 5 },
  { color: 'yellow', size: 25, points: 2 },
  { color: 'orange', size: 35, points: 10 }
];

function setup() {
  createCanvas(400, 600);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  
  if (!gameOver) {
    // Desenhar a pá mais parecida com uma
    drawShovel(mouseX, height - 20);
    
    // Gerar novas frutas aleatoriamente
    if (frameCount % 60 === 0) {
      fruits.push(new Fruit());
    }
    
    // Atualizar e mostrar frutas
    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].update();
      fruits[i].show();
      
      // Verificar colisão com a pá
      if (
        fruits[i].y + fruits[i].size / 2 > height - 40 &&
        abs(fruits[i].x - mouseX) < 40
      ) {
        // Pegou a fruta
        score += fruits[i].points; // soma os pontos específicos da fruta
        fruits.splice(i, 1);
      }
      // Verificar se a fruta tocou o chão
      else if (fruits[i].y - fruits[i].size / 2 > height) {
        lives--;
        fruits.splice(i, 1);
        if (lives <= 0) {
          gameOver = true;
        }
      }
    }
    
    // Mostrar pontuação e vidas
    fill(0);
    textSize(20);
    text("Pontuação: " + score, 60, 25);
    text("Vidas: " + lives, 60, 50);
  } else {
    // Tela de Game Over
    background(0);
    fill(255, 0, 0);
    textSize(40);
    text("Game Over!", width / 2, height / 2 - 40);
    fill(255);
    textSize(20);
    text("Pressione ENTER para reiniciar", width / 2, height / 2 + 20);
  }
}

// Função para desenhar uma pá mais realista
function drawShovel(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(100); // cor cinza metálica
  
  // Desenhar a lâmina da pá
  beginShape();
  vertex(-40, 0);
  vertex(40, 0);
  vertex(30, -10);
  vertex(-30, -10);
  endShape(CLOSE);
  
  // Desenhar o cabo
  fill(80);
  rect(0, 10, 10, 40, 3);
  pop();
}

function keyPressed() {
  if (gameOver && keyCode === ENTER) {
    resetGame();
  }
}

function resetGame() {
  fruits = [];
  score = 0;
  lives = 3;
  gameOver = false;
  loop();
}

class Fruit {
  constructor() {
    this.type = random(fruitTypes);
    this.x = random(50, width - 50);
    this.y = 0;
    this.size = this.type.size;
    this.speed = random(2, 4);
    this.points = this.type.points; // adicionando pontos específicos
  }
  
  update() {
    this.y += this.speed;
  }
  
  show() {
    fill(this.type.color);
    ellipse(this.x, this.y, this.size);
  }
}