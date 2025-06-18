let baloes = [];
let bandeirinhas = [];
let pessoasCampo = [];
let pessoasCidade = [];
let lanchonete;
let carro;
let joao; // Personagem do carro
let carroSaiu = false;

function setup() {
  createCanvas(800, 500);
  angleMode(DEGREES);
  textFont('Arial');

  for (let i = 0; i < 5; i++) {
    baloes.push({ x: random(100, 700), y: random(100, 300), speed: random(0.3, 1) });
  }

  for (let i = 0; i < 12; i++) {
    bandeirinhas.push({ 
      x: i * 70 + 20, 
      y: 100, 
      color: color(random(255), random(255), random(255)) 
    });
  }

  for (let i = 0; i < 6; i++) {
    pessoasCampo.push({ 
      x: 280 + i * 70, 
      baseY: 380 + random(-5, 5), 
      color: color(random(255), random(255), random(255)), 
      phase: random(360),
      talkingTimer: 0,
      talkMsg: ''
    });
  }

  for (let i = 0; i < 3; i++) {
    pessoasCidade.push({
      x: -100 - i * 100,
      y: 380,
      dir: 1,
      color: color(random(200), random(200), random(200)),
      phase: random(360),
      talkingTimer: 0,
      talkMsg: ''
    });
    pessoasCidade.push({
      x: width + 100 + i * 100,
      y: 380,
      dir: -1,
      color: color(random(200), random(200), random(200)),
      phase: random(360),
      talkingTimer: 0,
      talkMsg: ''
    });
  }

  lanchonete = { x: 520, y: 370, w: 160, h: 100 };
  carro = { x: 50, y: 410, w: 60, h: 30, cor: color(0, 150, 255) };
  joao = { x: carro.x, y: carro.y, cor: color(255, 200, 0), talkingTimer: 0, talkMsg: '' };
}

function draw() {
  background(30, 30, 80);
  desenhaCidade();
  desenhaCampo();
  desenhaBandeirinhas();
  desenhaCasasDeMadeira();
  desenhaBaloes();
  desenhaFogueiraQuadrada();
  desenhaLanchonete();
  desenhaPessoasCampo();
  desenhaPessoasCidade();
  
  if (!carroSaiu) {
    desenhaCarro();
  } else {
    movimentaJoao();
    desenhaJoao();
  }

  checaConversa();
}

function desenhaCarro() {
  fill(carro.cor);
  rect(carro.x, carro.y, carro.w, carro.h, 5);
  fill(255);
  ellipse(carro.x + 10, carro.y + carro.h, 15, 15);
  ellipse(carro.x + carro.w - 10, carro.y + carro.h, 15, 15);
  
  fill(255, 200, 0);
  ellipse(carro.x + carro.w / 2, carro.y - 10, 20, 20);
  fill(0);
  textSize(10);
  textAlign(CENTER);
  text("João", carro.x + carro.w / 2, carro.y - 20);
}

function movimentaJoao() {
  if (keyIsDown(65)) joao.x -= 2; // A
  if (keyIsDown(68)) joao.x += 2; // D
  if (keyIsDown(87)) joao.y -= 2; // W
  if (keyIsDown(83)) joao.y += 2; // S
}

function desenhaJoao() {
  fill(joao.cor);
  ellipse(joao.x, joao.y, 20, 20);
  rect(joao.x - 10, joao.y + 10, 20, 30);
  
  fill(218, 165, 32);
  arc(joao.x, joao.y - 12, 30, 12, PI, TWO_PI);
  triangle(joao.x - 10, joao.y - 12, joao.x, joao.y - 30, joao.x + 10, joao.y - 12);

  if (joao.talkingTimer > frameCount) {
    desenhaBalãoDeFala(joao.x, joao.y - 40, joao.talkMsg);
  }
}

function keyPressed() {
  if (!carroSaiu && key === ' ') {
    carroSaiu = true;
    joao.x = carro.x + carro.w / 2;
    joao.y = carro.y;
  }
}

function checaConversa() {
  let allPeople = pessoasCampo.concat(pessoasCidade);
  if (carroSaiu) allPeople.push(joao);

  for (let i = 0; i < allPeople.length; i++) {
    for (let j = i + 1; j < allPeople.length; j++) {
      let p1 = allPeople[i];
      let p2 = allPeople[j];

      let y1 = p1.baseY || p1.y;
      let y2 = p2.baseY || p2.y;
      let d = dist(p1.x, y1, p2.x, y2);

      if (d < 50) {
        if (p1.talkingTimer < frameCount && p2.talkingTimer < frameCount) {
          p1.talkingTimer = frameCount + 120;
          p2.talkingTimer = frameCount + 120;
          p1.talkMsg = escolheMensagem();
          p2.talkMsg = escolheMensagem();
        }
      }
    }
  }
}

function escolheMensagem() {
  let msgs = [
    "Oi, tudo bem?",
    "Vamos comer pamonha!",
    "Que festa boa!",
    "O carro chegou!",
    "Bora dançar quadrilha!",
    "Fogueira tá bonita!",
    "Você é da cidade?",
    "Cheguei no arraiá!"
  ];
  return random(msgs);
}

// As funções abaixo permanecem iguais:
function desenhaCampo() {
  noStroke();
  fill(34, 139, 34);
  rect(0, 400, width, 100);
}

function desenhaCidade() {
  fill(60);
  noStroke();
  for (let i = 0; i < width; i += 80) {
    let h = 150 + sin(frameCount + i) * 20;
    rect(i, height - h - 100, 60, h);
    fill(255, 255, 100);
    for (let j = 0; j < 4; j++) {
      rect(i + 10, height - h - 80 + j * 30, 10, 10);
      rect(i + 30, height - h - 80 + j * 30, 10, 10);
    }
    fill(60);
  }
}

function desenhaCasasDeMadeira() {
  let casas = [ { x: 100, y: 340 }, { x: 600, y: 350 } ];
  for (let c of casas) {
    fill(139, 69, 19); rect(c.x, c.y, 80, 60);
    fill(165, 42, 42); triangle(c.x - 10, c.y, c.x + 40, c.y - 40, c.x + 90, c.y);
    fill(100, 50, 20); rect(c.x + 30, c.y + 25, 20, 35);
    fill(255, 255, 150); rect(c.x + 10, c.y + 20, 15, 15);
  }
}

function desenhaBandeirinhas() {
  noStroke();
  for (let b of bandeirinhas) {
    fill(b.color);
    triangle(b.x, b.y, b.x + 20, b.y + 20, b.x - 20, b.y + 20);
  }
}

function desenhaBaloes() {
  noStroke();
  for (let b of baloes) {
    fill(255, 0, 0);
    ellipse(b.x, b.y, 20, 30);
    triangle(b.x - 10, b.y + 15, b.x + 10, b.y + 15, b.x, b.y + 30);
    b.y -= b.speed;
    if (b.y < 0) b.y = height;
  }
}

function desenhaFogueiraQuadrada() {
  let x = width / 2;
  let y = 390;
  noStroke();
  fill(139, 69, 19);
  for (let i = 0; i < 4; i++) {
    rect(x - 30 - i * 3, y - i * 15, 60 + i * 6, 10);
  }
  let t = frameCount;
  fill(255, 140, 0, 200); rect(x - 20, y - 60 + sin(t * 0.3) * 2, 40, 40);
  fill(255, 180, 0, 220); rect(x - 15, y - 50 + cos(t * 0.5) * 2, 30, 30);
  fill(255, 255, 100, 180); rect(x - 10, y - 40 + sin(t * 0.7) * 2, 20, 20);
}

function desenhaLanchonete() {
  fill(210, 180, 140); rect(lanchonete.x, lanchonete.y, lanchonete.w, lanchonete.h, 15);
  fill(178, 34, 34); triangle(lanchonete.x - 10, lanchonete.y, lanchonete.x + lanchonete.w / 2, lanchonete.y - 50, lanchonete.x + lanchonete.w + 10, lanchonete.y);
  fill(135, 206, 250); rect(lanchonete.x + 20, lanchonete.y + 30, 40, 30); rect(lanchonete.x + 100, lanchonete.y + 30, 40, 30);
  fill(100, 50, 20); rect(lanchonete.x + lanchonete.w / 2 - 15, lanchonete.y + 50, 30, 50);
}

function desenhaPessoasCampo() {
  let tempo = frameCount;
  stroke(0); strokeWeight(2);
  for (let p of pessoasCampo) {
    let osc = sin(tempo * 5 + p.phase) * 5;
    let y = p.baseY + osc;
    noStroke(); fill(p.color); ellipse(p.x, y, 20, 20); rect(p.x - 10, y + 10, 20, 30);
    stroke(0); strokeWeight(2);
    let angulo = sin(tempo * 10 + p.phase) * 20;
    line(p.x - 10, y + 40, p.x - 10 + sin(angulo) * 5, y + 60);
    line(p.x + 10, y + 40, p.x + 10 - sin(angulo) * 5, y + 60);
    line(p.x - 10, y + 15, p.x - 10 - cos(angulo) * 10, y + 25);
    line(p.x + 10, y + 15, p.x + 10 + cos(angulo) * 10, y + 25);
    noStroke(); fill(218, 165, 32);
    arc(p.x, y - 12, 30, 12, PI, TWO_PI);
    triangle(p.x - 10, y - 12, p.x, y - 30, p.x + 10, y - 12);
    if (p.talkingTimer > frameCount) desenhaBalãoDeFala(p.x, y - 40, p.talkMsg);
  }
}

function desenhaPessoasCidade() {
  let tempo = frameCount;
  stroke(0); strokeWeight(2);
  for (let p of pessoasCidade) {
    p.x += p.dir * 1;
    if (p.dir === 1 && p.x > lanchonete.x - 60) p.x = lanchonete.x - 60;
    if (p.dir === -1 && p.x < lanchonete.x + lanchonete.w + 60) p.x = lanchonete.x + lanchonete.w + 60;
    noStroke(); fill(p.color); ellipse(p.x, p.y, 20, 20); rect(p.x - 10, p.y + 10, 20, 30);
    stroke(0); strokeWeight(2);
    let angulo = sin(tempo * 10 + p.phase) * 20;
    line(p.x - 10, p.y + 40, p.x - 10 + sin(angulo) * 5, p.y + 60);
    line(p.x + 10, p.y + 40, p.x + 10 - sin(angulo) * 5, p.y + 60);
    line(p.x - 10, p.y + 15, p.x - 10 - cos(angulo) * 10, p.y + 25);
    line(p.x + 10, p.y + 15, p.x + 10 + cos(angulo) * 10, p.y + 25);
    noStroke(); fill(218, 165, 32);
    arc(p.x, p.y - 12, 30, 12, PI, TWO_PI);
    triangle(p.x - 10, p.y - 12, p.x, p.y - 30, p.x + 10, p.y - 12);
    if (p.talkingTimer > frameCount) desenhaBalãoDeFala(p.x, p.y - 40, p.talkMsg);
  }
}

function desenhaBalãoDeFala(x, y, texto) {
  push();
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(x, y - 10, texto.length * 8 + 20, 30, 10);
  triangle(x - 10, y + 5, x + 10, y + 5, x, y + 15);
  fill(0);
  noStroke();
  text(texto, x, y - 10);
  pop();
}