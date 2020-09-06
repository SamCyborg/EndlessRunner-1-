class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,100);
    car2 = createSprite(100,300);
    car3 = createSprite(100,500);
    //car4 = createSprite(700,200);
    cars = [car1,car2,car3];
  }



  play(){
    form.hide();
    textSize(50);
    fill("green")
    text("Game Start", 850, 130);
    text("S",1500,200);
    text("T",1500,300);
    text("A",1500,400);
    text("R",1500,500);
    text("T",1500,600);
    

    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var y = 0;
      var x;
      for(var plr in allPlayers){
        index = index+1;
        y = y + 200;
        x = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor="purple";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }
    drawSprites();
  }
}
