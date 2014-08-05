console.log("run");

var map = document.getElementById("map"),
    ctx = map.getContext("2d");

    map.width = window.innerWidth;
    map.height = window.innerHeight;
    map.x = 50;

var celSize = 15;
var mapSize = 20;

for (var r=0, y=0; r<mapSize; r++, y +=celSize){

    for (var c=0 , x=0; c<mapSize; c++, x +=celSize){
        ctx.strokeRect( x, y, celSize, celSize);
    }
}

$(this).on('click', function(){
    var cursorX = window.event.pageX;
    var cursorY = window.event.pageY;
    console.log("x " + cursorX +", y" + cursorY);
})