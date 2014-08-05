console.log("run");

//var map = document.getElementById("map"),
//    ctx = map.getContext('2d');
//    map.width = 100;
//    map.height = 100;
//
//
//var cellSize = 32;
////var $cellTemplate = $("<span />").addClass("cell").width(cellSize).height(cellSize);
//var temp = 10;
//
//for (var r=0; r<temp; r++){
//
//    for (var c=0; c<temp; c++){
//
//    }
//}
//
//ctx.fillRect(0, 0, 10, 10);

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

x = {x1:0,
    x2:400};

y = {y1:0,
    y2:400};

ctx.beginPath();
ctx.moveTo(x.x1, y.y1);
ctx.lineTo(x.x2, y.y2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x.x2, y.y1);
ctx.lineTo(x.x1, y.y2);
ctx.stroke();