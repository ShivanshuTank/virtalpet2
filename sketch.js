var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var milk1,milk2,milk3,milk4,milk5;
var milk1img,milk2img,milk3img,milk4img,milk5img
function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happydog.png");
   milk1img=loadImage("milk.png")
   milk2img=loadImage("milk.png")
   milk3img=loadImage("milk.png")
   milk4img=loadImage("milk.png")
   milk5img=loadImage("milk.png")
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(600,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  milk1=createSprite(100,400,50,50);
  milk1.addImage(milk1img)
  milk1.scale= 0.05
  milk2=createSprite(200,400,50,50);
  milk2.addImage(milk2img)
  milk2.scale= 0.05
  milk3=createSprite(300,400,50,50);
  milk3.addImage(milk1img)
  milk3.scale= 0.05
  milk4=createSprite(400,400,50,50);
  milk4.addImage(milk1img)
  milk4.scale= 0.05
  milk5=createSprite(500,400,50,50);
  milk5.addImage(milk1img)
  milk5.scale= 0.05
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  textSize(20); 
  if(foodS===4){
   milk1.display=false
  }
}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}