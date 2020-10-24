var back, backImage;
var Ghost, ghostImage;
var Door, doorImage;
var invisibleC, climber, climberImage;
var doorGroup, invisibleCGroup, climberGroup, Sound;
var gameState = "play";

function preload(){
  backImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadAnimation("ghost-standing.png","ghost-jumping.png");
  Sound = loadSound("spooky.wav");
}

function setup (){
  createCanvas(windowWidth,windowHeight);
  
  back = createSprite(windowWidth/2,windowHeight/2);
  back.addImage (backImage);
  back.scale = 2.5
  back.velocityY = 1;
  Ghost = createSprite(200,windowHeight/2-100,50,50);
  Ghost.addAnimation("ghost",ghostImage);
  Ghost.scale = 0.45;
  doorGroup = new Group();
  invisibleCGroup = new Group();
  climberGroup = new Group();
  
}

function draw(){
  background(0);

if (gameState==="play"){
  
  if (back.y>windowWidth/2+100){
    back.y = windowWidth/2;
  }   
  
  if (keyDown("space")){
    Ghost.velocityY = -4;
  }
   Ghost.velocityY +=0.8;
  
  if (keyDown("left")){
    Ghost.x -= 4;
  }
  
  if (keyDown("right")){
    Ghost.x += 4;
  }
  
  SpawnDoor();
  
  if (invisibleCGroup.isTouching(Ghost)||Ghost.y>windowHeight){
    gameState = "end";
    Ghost.destroy();
  }
  
  if (climberGroup.isTouching(Ghost)){
    Ghost.velocityY=0;
  }
  
  
  drawSprites();
 }
  else if (gameState==="end"){
    stroke("yellow")
    fill("pink");
    textSize(30);
    text("GAME OVER",windowWidth/2-100,windowHeight/2);
  }
}

function SpawnDoor(){
  if (frameCount%240===0){
    Door = createSprite(Math.round(random(windowWidth/2-200,windowHeight/2+100)),-50);
    Door.addImage(doorImage);
    Door.velocityY = 1;
    Door.lifetime=800;
    doorGroup.add(Door);
    Door.depth=Ghost.depth;
    Ghost.depth+=1;
    
    climber= createSprite(windowWidth/2-100,10);
    climber.addImage(climberImage);
    climber.x= Door.x;
    climber.velocityY = 1;
    climber.lifetime=800;
    climberGroup.add(climber);
    
    invisibleC = createSprite(windowWidth/2-100,15);
    invisibleC.width=climber.width
    invisibleC.height=2;
    invisibleC.x = Door.x;
    invisibleC.velocityY = 1;
    invisibleC.lifetime=800;
    invisibleCGroup.add(invisibleC);
    invisibleC.visible=false;
    
  }
  
}
