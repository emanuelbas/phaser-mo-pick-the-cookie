/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 *
 * Date:      06/09/2021 
 * Edited by: Emanuel Bastons (emanuelbastons@gmail.com)
 * Details:   EB01 - Print a cookie
 *
 * Date:       
 * Edited by:   
 * Details:   
 *
 */

var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.spritesheet('items1', 'assets/sprites/items1.png', 48, 48, 1000 ); //EB01
    game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){


    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
//EB01-I
//    cookie = game.add.sprite(400,200,'items1', 10);
//    cookie.scale.setTo(1,1);
//EB01-F
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    let frameNumber = Math.floor(Math.random() * (178 - 176) + 176);
    Game.playerMap[id] = game.add.sprite(x,y,'items1', frameNumber);
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};