// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

/*
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
*/

var score = 0;
var labelScore;
var player;
var pipes = [];
var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 400;
var jumpPower = 200;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 5;


var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

// jQuery("#greeting-form").on("submit", function(event_details) { var greeting = "Hello ";
// var name = jQuery("#fullName").val();
// var greeting_message = greeting + name; jQuery("#greeting-form").hide(); jQuery("#greeting").append("<p>" + greeting_message + " (" +
//         jQuery("#email").val() + "): " + jQuery("#score").val() + "</p>");
//     event_details.preventDefault();
// });

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

          // game.load.image("playerImg", "../assets/flappy.png");
          game.load.spritesheet("playerImg", "../assets/mummy.png", 37, 45, 18);
          game.load.image("playerImg1", "../assets/jamesBond.gif");
          game.load.image("playerImg2", "../assets/flappy.png");
          game.load.image("playerImg3", "../assets/jamesBond.gif");
          game.load.image("pipeBlock", "../assets/pipe2-body.png");
          game.load.image("pipeEnd", "../assets/pipe2-end.png");
          game.load.image("balloons", "../assets/balloons.png");
          game.load.image("bcgd", "../assets/bcgd_test.png");

          //  game.load.image("backgroundImage", "../assets/bg_test.png");

        //adding sound effects
          game.load.audio("score", "../assets/pigeon.ogg");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {



        game.physics.startSystem(Phaser.Physics.ARCADE);

          // set the background colour of the scene

        game.stage.setBackgroundColor("00ACD3");


        game.add.tileSprite(0, 0, width, height, "bcgd")


        player = game.add.sprite(200, 50, "playerImg");
        game.physics.arcade.enable(player);

        player.anchor.setTo(0.5, 0.5);

        player.body.gravity.y = gameGravity;

        labelScore = game.add.text(0,0, score.toString());

          // Add text and icons
      /*

      Put text and icons in the corners (totally inutile)
          //game.add.text(20, 20, "Hello World!");
          game.add.text(20, 360, "Hello World!");
          game.add.text(610, 360, "Hello World!");
          game.add.text(610, 20, "Hello World!");
          //game.add.sprite(20, 40, "playerImg0");
          game.add.sprite(20, 320, "playerImg1");
          game.add.sprite(725, 315, "playerImg2");
          game.add.sprite(740, 50, "playerImg3");

          */



          game.input
              .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
              .onDown.add(playerJump);



          generatePipe();



          var pipeInterval = 2 * Phaser.Timer.SECOND;
            game.time.events.loop(
              pipeInterval,
              generatePipe
            );


            var walk = player.animations.add('walk');
            player.animations.play('walk', 30, true);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


            player.rotation += 1;
            player.rotation = Math.atan(player.body.velocity.y / gameSpeed);


            if(player.body.y<0){
              gameOver();
            }
            if(player.body.y>400){
              gameOver();
            }



            game.physics.arcade.overlap(
              player,
              pipes,
              gameOver
            )

}






function gameOver(){
  location.reload();
  registerScore(score);
  game.state.restart();

  function game_over() {
    game.destroy();
    $("#score").val(score);
    $("#greeting").show();
  }
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
}


function addPipeEnd(x, y){
  var block = game.add.sprite(x, y, "pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
  // var blockVelocity = game.rnd.integerInRange(-200, -400);
  // block.body.velocity.x = blockVelocity;
}


    // generate random gaps in the pipes
function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
  for(var y = gapStart - pipeEndHeight; y>0; y -= blockHeight){
      addPipeBlock(width, y - blockHeight);
  }


  for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight){
      addPipeBlock(width, y);
  }
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize + pipeEndHeight/2 + 10);

  changeScore();
}


function playerJump(){
  player.body.velocity.y = -jumpPower;
  game.sound.play("score");

}

    // Moving in the game space  --> CF starting from 59



function spaceHandler() {
  changeScore();
  game.sound.play("score");


}


function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString()); // replaces the old score by the next score

  if(player.body.x < (width / 2)) { //increasing difficulty
        player.body.x += 5;
    }
}


// function addPipeBlock(x, y) {
//  // make a new pipe block
//  var block = game.add.sprite(x, y, "pipeBlock");
//  // insert it in the pipe array
//  pipes.push(block);
//  // enable physics engine for the block
//  game.physics.arcade.enable(block);
//  // set the block's horizontal velocity to a negative value
//  // (negative x value for velocity means movement will be towards left)
//  block.body.velocity.x = -200;
//  //new things here
//  var flagDestroy = game.rnd.integerInRange(0, 5);
//  if (flagDestroy == 0) {
//  var destroyTime = game.rnd.integerInRange(500, 1000);
//  game.time.events.add(destroyTime, function() {
//  block.destroy();
//  }, this);
//  }
// }



// function generateBalloons(){
//     var bonus = game.add.sprite(width, height, "balloons");
//         balloons.push(bonus);
//         game.physics.arcade.enable(bonus);
//         bonus.body.velocity.x = - 200;
//         bonus.body.velocity.y = ‐ game.rnd.integerInRange(60, 100);
// }
