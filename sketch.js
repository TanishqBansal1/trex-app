var trex, trexRun, ground, groundI, ground2, score=0;
var hs=0, cloud, cloudI, play=0, end=1, gameS=play;
var ob1, ob2, ob3, ob4, ob5, ob6, ob;
var cloudG, cactusG, trexS, go, re, goi, rei;
var die, checkP, jump;

function preload(){
  
trexRun=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundI=loadImage("ground2.png");
  cloudI=loadImage("cloud.png");
  trexS=loadAnimation("trex_collided.png");
  
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
  goi=loadImage("gameOver.png");
  rei=loadImage("restart.png");
  
  jump=loadSound("jump.mp3");
  checkP=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  trex= createSprite(50,height-50,5,5);
  trex.addAnimation("ash",trexRun);
  trex.scale=0.5;
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,100,trex.height);
  trex.addAnimation("ghf",trexS);
  
  ground=createSprite(width/2,height-40,width,3);
  ground.addImage(groundI);
  
  ground2=createSprite(width/2,height-30,width,5);
  ground2.visible=false;
  
  cloudG=new Group();
  cactusG=new Group();
  
  go=createSprite(width/2,height/2,10,10);
  go.addImage(goi);
  go.scale=0.5;
  
  re=createSprite(width/2,height/2,10,10);
  re.addImage(rei);
  re.scale=0.3;
}

function draw(){
  background(0);
  

  
  text("Score:"+score, width-100 , 20);
  text("HI:"+hs, width-220 , 20);
  
  if(score > hs){
    hs=score;
  }
  
  if(gameS===play){
    
  
    if(score>0 && score%100===0 ){
      checkP.play();
    }
    
     ground.velocityX= -(3+(score/300));  
    
     score=score+ (Math.round(getFrameRate()/60));
    
     if( ground.x <0){
       ground.x=ground.width/2;
     }
    
     if((touches.length>0 || keyDown("space")) && trex.y>height-70 ){
       trex.velocityY=-12;
       jump.play();
       touches=[];
     }
    
    trex.velocityY=trex.velocityY+0.4;
  
    trex.collide(ground2);
    
    spawnCactus();
    spawnClouds();
    
    re.visible=false;
    go.visible=false;
    
    if(trex.isTouching(cactusG)){
      gameS=end;
      die.play();
    }
    
  }
  
  if(gameS===end){
    
    trex.velocityY=0;
    ground.velocityX=0;
    
    cloudG.setVelocityXEach(0);
    cactusG.setVelocityXEach(0);
    
    cloudG.setLifetimeEach(-1);
    cactusG.setLifetimeEach(-1);
    
    trex.changeAnimation("ghf",trexS);
    
    re.visible=true;
    go.visible=true;
    
    if(touches.length>0 || mousePressedOver(re)){
      reset();
      touches=[];
    }
  }
  
  drawSprites();
}

function reset(){
  
  gameS=play;
  score=0;
  trex.changeAnimation("ash",trexRun);
  cactusG.destroyEach();
  cloudG.destroyEach();
}

function spawnClouds(){
  
  if(frameCount%80===0){
    
  cloud=createSprite(width,random(15,50),10,10);
  cloud.velocityX=-3;  
  cloud.addImage(cloudI);
  cloud.scale=0.5;
    
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
    
  cloud.lifetime=width/2;
  cloudG.add(cloud);
  }
  
}

function spawnCactus(){
  
  if(frameCount%100===0){
    
    ob=createSprite(width,height-55,10,10);
    ob.velocityX=-(3+(score/300));
    ob.scale=0.5;
    ob.lifetime=width/2;
    cactusG.add(ob);
    
    var a=Math.round(random(1,6));
    switch(a){
     
        case 1: ob.addImage(ob1);
        break;
        
        case 2: ob.addImage(ob2);
        break;
        
        case 3: ob.addImage(ob3);
        break;
        
        case 4: ob.addImage(ob4);
        break;
        
        case 5: ob.addImage(ob5);
        break;
        
        case 6: ob.addImage(ob6);
        break;
        
        default: break;
    }
 }
}


