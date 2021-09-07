/**
 * Created by Jerome on 03-03-17.
 */
var cookie;
var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});

//EB02
Client.socket.on('cookieUpdate', function(data){
  console.log("He recibido la posición de la galleta, señor");
  console.log("Se encuentra en la posición x:"+data.x+" y:"+data.y);
  if (cookie) {
    cookie.destroy();
  }
  cookie = game.add.sprite(data.x,data.y,'items1', 10);
  cookie.scale.setTo(0.5,0.5);
});


