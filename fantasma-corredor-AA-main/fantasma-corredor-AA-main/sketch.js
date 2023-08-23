  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var obstacleImg, obstacle, obstacleGroup, obstacleImg2;
var invisibleWallsGroup1, invisibleWallsGroup2, invisibleWallleft, invisibleWallright;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  obstacleImg = loadImage("Bao(enemigo1.png");
  obstacleImg2 = loadImage("Bao(enemigo2.png");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  obstacleGroup = new Group();
  invisibleWallsGroup1 = new Group();
  invisibleWallsGroup2 = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
 if(tower.y > 500){
      tower.y = 300
    } 
  
  if (gameState === "play") {
    spookySound.loop();

    if(keyDown("A")){
        ghost.x = ghost.x - 3;

      //escribir el código para mover al fantasma a la izquierda al presionar la flecha izquierda
    }
    if(keyDown("D")){
  
          ghost.x = ghost.x + 3;

      //escribir el código para mover el fantasma a la derecha al presionar la flecha derecha 
      
    }
    if(keyDown("space")){
  
         ghost.velocityY = -10;

      //escribir el código para mover el fantasma hacia arriba al presionar la flecha arriba 
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
   
   
      //escribir una condición para desplazar infinitamente la torre
    
      spawnDoors();
      spawnObstacles();
      spawnInvisibleWall1();
      spawnInvisibleWall2();

  
//escribir el código para hacer que invisibleBlockGroup colisione con el fantasma y cambiar gamestate a end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(obstacleGroup.bounceOff(invisibleWallsGroup2)){
      obstacleGroup.velcityX = -2;
    }

    if(obstacleGroup.bounceOff(invisibleWallsGroup1)){
      obstacleGroup.velcityX = 2;
    }

    if(obstacleGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("black");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}

function spawnDoors() {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round (random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
     
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

   door.lifetime = 800;
   climber.lifetime = 800;
   invisibleBlock.lifetime = 800;
    
   doorsGroup.add(door);
   invisibleBlock.debug = false;
   climbersGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
  }
}

function spawnObstacles() {
 if (frameCount % 500 === 0) {
    var obstacle = createSprite(200, 10);
    obstacle.x = Math.round (random(100,420));
    obstacle.addImage(obstacleImg);
    obstacle.velocityY = 1;
    obstacle.lifetime = 800;
    obstacle.scale = .08;
    obstacle.velocityX = 2;
    obstacle.debug = false;

    obstacleGroup.add(obstacle);
}
}

function spawnInvisibleWall1 () {
  var invisibleWallleft = createSprite(70,200);
  invisibleWallleft.width = 10;
  invisibleWallleft.height = 1000;
  invisibleWallleft.visible = false;
  invisibleWallleft.lifetime = 600;

  invisibleWallsGroup1.add(invisibleWallleft);

}

function spawnInvisibleWall2 () {
  var invisibleWallright = createSprite(532,200);
  invisibleWallright.width = 10;
  invisibleWallright.height = 1000;
  invisibleWallright.visible = false;
  invisibleWallright.lifetime = 600;

  invisibleWallsGroup2.add(invisibleWallright);

}
