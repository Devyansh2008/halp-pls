var b
var i
var e
var db
var g=0
var p=0, name
var car1
var car2
var cars=[]
var i1, i2
var ap
var abc
var link=0

function preload(){
i1=loadImage("car1.png")
i2=loadImage("dream.png")
}
function setup() {
createCanvas(1200,600)
b=createButton("Memes")
b.position(69,420)
i=createInput()
i.position(420,69)
e=createElement("h1")
e.position(69,21)
e.html("hehe buae")
db=firebase.database()
db.ref("gs").on("value", function (data){
  g=data.val()
})

db.ref("pc").on("value", function (data){
  p=data.val()
})


b.mousePressed(enter)

r=createButton("Reset")
r.position(100,200)
r.mousePressed(reset)
car1=createSprite(200,200,20,20)
car2=createSprite(600,200,20,20)
car1.addImage("c1", i1)
car1.scale=0.5
car2.addImage("c2", i2)
car2.scale=0.3
cars=[car1,car2]
}

function draw() {
  background(random(0,255),random(0,255),random(0,255));
  if (p===2){
    db.ref("/").update({
      gs:1
    })
  }
  
  if(g===1 && abc===undefined){
    db.ref("players").on("value",function (data){
      abc=data.val()
    })
    
    }

   if(g===1){
    var index=0
    var x=250
    for(var i in abc){
      //cars[0].x=250
      cars[index].x=x
      x=x+200
      cars[index].y=abc[i].y
      index++
    }

    if(keyDown("up")){
      cars[link-1].y=cars[link-1].y-5

      db.ref("players/player"+link).update({
        y: cars[link-1].y
      })
    }

  drawSprites();
  }
}


function enter(){
  name=i.value()
  greet=createElement("h1")
  greet.html("Welcome "+name)
  greet.position(350,200)
  p=p+1
  link=p
  db.ref("/").update({
    pc:p
  })

  db.ref("players/player"+p).set({
    index:p,
    y:250
  })
}

function reset(){
  db.ref("/").update({
    gs:0,
    pc:0
  })
db.ref("players").remove()
}