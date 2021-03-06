
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var drops =[];
var score=0;
var gameStarted;
function preload()
{
	
	emptyGlass=loadImage("glass.jpg");
	filledGlass=loadImage("filled glass.jpg");
	gameEnded=loadImage("GEB.PNG");
	gameStarted=loadImage("GSB.PNG");
	Ready=loadImage("ready button.png");

	splash=loadImage("splash.jpg");
	
	water=loadImage("water(smile).jpg");
	car=loadImage("car.jpg");
	garden=loadImage("garden.jpg");
	
}

function setup() {
	createCanvas(800, 400);


	engine = Engine.create();
	world = engine.world;


glass1=new glass(400,280,20,20);
ground1=new ground(400,390,800,10);
startButton=createSprite(375,200,20,30);
startButton.scale=0.25;
startButton.addImage(gameStarted);
endButton=createSprite(375,200,20,30);
endButton.scale=0.25;
endButton.addImage(gameEnded);
endButton.visible=false;
//startButton.mousePressed(startGame);



// set gameStarted equal to false
gameStarted = false;


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("black");

  ground1.display();
  glass1.display();
 // display score
 fill("red");
 noStroke();
 textSize(24);
 text("Score: " + score, 30, 50);
  if(gameStarted === true)
  {
  
    // hide start button
    startButton.visible=false;
  
    // display glass
    glass1.display();
	var r = Math.ceil(random(30));
    if(r == 1)
    {
      drops.push(new drop());
    }
  
    // loop through each drop
    for (var j=0; j<drops.length; j++) 
    {
      // display dots
      drops[j].display();
    
      // check if dot reaches bottom of screen
      if(drops[j].ypos > 500)
      {
        // remove dot
        drops.splice(j, 1);
    
      } else {
    
        // check if pacman is touching dot
        var d2 = dist(drops[j].xpos, drops[j].ypos, glass1.xpos, glass1.ypos);
        if(d2 < 25)
        {
          // remove dot
          drops.splice(j, 1);
        
          // increase score by one
          score++;
    
        }
      }
      
    }
  
    // check for game over
    if(score >=30)
    {
      
      score = 0;      
    
	drops = [];
      endButton.visible=true;
      
      // set gameStarted to false
      gameStarted = false;
    }
  
  }
  if(mousePressedOver(startButton)){
    startGame();
  }
  if(mousePressedOver(endButton)){
   startButton.visible=true; 
  }
  drawSprites();
}

function startGame()
{
  // change gameStarted variable
  gameStarted = true;
  
 gameEnded.visible=false;
}
