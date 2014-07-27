var canvas = document.getElementById("canvas"),
    ctx    = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    x = {x1:0,
         x2:400};

    y = {y1:0,
         y2:400};

    arrLight = [
       [ [0, 0], [400,400] ]
    ];

    arrNewLight = [];

    console.log("arrLight ", arrLight);

ctx.beginPath();
ctx.moveTo(x.x1, y.y1);
ctx.lineTo(x.x2, y.y2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x.x2, y.y1);
ctx.lineTo(x.x1, y.y2);
ctx.stroke();

var rast = 50;
rand(rast);

function rand (r){
    var rand = Math.round( Math.random() * (r - (r * -1)) + (r * -1) );
    lightning(arrLight[0][0][0], arrLight[0][0][1], arrLight[0][1][0], arrLight[0][1][0], rand);
};

function lightning (beginX, beginY, endX, endY, power){

    console.log("arg",arguments)
    var centerX = Math.abs(beginX - endX) / 2;
    var centerY = Math.abs(beginY - endY) / 2;
    ctx.fillRect(centerX - 3, centerY - 3, 6, 6);

    var perpen = Math.sqrt(power * power) / 2;
    if (power < 0)
        perpen *= -1;

    ctx.beginPath();
    ctx.moveTo(x.x1, y.y1);
    ctx.lineTo(centerX + perpen, centerY - perpen);
    ctx.lineTo(x.x2, y.y2);
    ctx.stroke();
    ctx.fillRect(centerX + perpen - 3, centerY - perpen - 3, 6, 6);
    console.log("perpen", perpen);

    arrNewLight.push(
        [ [beginX, beginY], [centerX , centerY] ],
        [ [centerX , centerY], [endX , endY] ]
    );

    length = arrLight.length;
    console.log("length", length);

    for (i=1; i < length; i++){
        arrLight.splice( i, 0, arrNewLight );
        console.log("arrNewLight", arrNewLight);
    }

};

arr = [1 , 2];
function touch (){
    arrNew = [0.1];
    arr.splice(1, 0,arrNew[0]);
};