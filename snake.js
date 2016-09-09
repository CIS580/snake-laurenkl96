var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var cw= backCtx.width;
var ch= backCtx.height;
var apple;
var apples = [];
var lastApple = 0;
var snake_array=[];
var m;


make_snake();
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;

  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

function make_snake(){
  for(var i = 4; i>=0; i --){
    var snake= {
      x:i, y:0,
    }
    snake_array.push(snake);
  }
}
/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

  // TODO: Spawn an apple periodically
  var a = "red";
  var apple = { 
      x: ((Math.random() * cw)/10),
      y: ((Math.random() * ch)/10),
    }
    apples.push(apple);
  if(elapsedTime > (lastApple + 1500)){
    lastApple = elapsedTime;
  }
  
  // TODO: Move the snake
  // hdx & hdy are the new head coordinates
  var hdx = snake_array[0].x;
  var hdy = snake_array[0].y;
  if(m == "right")hdx++;
  else if(m == "left")hdx--;
  else if(m == "up")hdy--;
  else if(m == "down")hdy++;
  var head= snake_array.pop();
  head.x=hdx;
  head.y=hdy;
  snake_array.unshift(head);// puts the head back
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(hdx == -1 || hdx == cw/10 || hdy == -1 || hdy ==ch/10){
    window.requestAnimationFrame(loop); // restart
  }
  // TODO: Determine if the snake has eaten its tail
  for(var c=0; c<snake_array.length;c++){
    if(snake_array[c].x==hdx && snake_array[c].y == hdy){
      window.requestAnimationFrame(loop);//restart
    }
  }
  // TODO: Determine if the snake has eaten an apple
  // TODO: Grow the snake periodically
  if(hdx==apple.x && hdy == apple.y){
    var head={x: hdx, y: hdy}
  }
  

  

}
document.addEventListener("keypress", keydown);
function keydown(e){
  var key = e.which;
  if(key == "37" && m!="right")m="left";
  else if(key == "38" && m!="down")m="up";
  else if(key == "39" && m!="left")m="right";
  else if(key == "38" && m!="up")m="down";
}
/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);

  // TODO: Draw the game objects into the backBuffer
  //Apple drawings
  var appl = apples.pop();
  backCtx.fillStyle="red";
  backCtx.fillRect(appl.x,appl.y,10,10);
  //Snake drawing
  for(var b = 0; b < snake_array.length; b++){
    backCtx.fillStyle="olive";
    backCtx.fillRect(snake_array[b].x,snake_array[b].y, 10, 10);
  }
}

/* Launch the game */
window.requestAnimationFrame(loop);
