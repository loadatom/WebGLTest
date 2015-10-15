function main()
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    drawSine1(canvas, ctx);
}

//draw static sine curve
function drawSine1(canvas, ctx)
{
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(0, canvas.height / 2);
    ctx.scale(1, -1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    var n = 0;
    var xPos = 0;
    var yPos = 0;
    var maxPoints = 50;
    for (n = 0; n <= maxPoints; n++) {
        var pos = calcPointPos(Math.sin, n, maxPoints, 0, Math.PI * 4, 0, canvas.clientWidth, 0, canvas.clientHeight / 2);
        xPos = pos.xPos;
        yPos = pos.yPos;
        ctx.lineTo(xPos, yPos);
    }
    ctx.stroke();
    ctx.closePath();
}

function calcPointPos(func, idx, maxPoints, xMinDomain, xMaxDomain, startX, endX, startY, endY)
{
    var x = idx * (xMaxDomain - xMinDomain) / maxPoints + xMinDomain;
    var y = func(x);
    var xPos = (endX - startX) * idx / maxPoints;
    var yPos = y * (endY - startY);
    return { xPos: xPos, yPos: yPos };
}

//draw sine curve which moves to left
function drawSine2(canvas, ctx) {
    
    var lastTime = Date.now();
    aniDrawSine(ctx, lastTime, 0, canvas.width, canvas.height);
}

function aniDrawSine(ctx, lastTime, startX, width, height)
{
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    
    ctx.translate(0, canvas.height / 2);
    ctx.scale(1, -1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = 'green';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    var n = 0;
    var xPos = 0;
    var yPos = 0;
    var maxPoints = 100;
    var curTime = Date.now();
    var timeDelta = curTime - lastTime;
    startX += 20 * timeDelta / 1000;
    for (n = 0; n <= maxPoints; n++) {
        var pos = calcPointPos2(Math.sin, n, maxPoints, 0, Math.PI * 4, startX, canvas.clientWidth, 0, canvas.clientHeight / 2);
        xPos = pos.xPos;
        yPos = pos.yPos;
        ctx.lineTo(xPos, yPos);
    }
    ctx.stroke();
    ctx.closePath();

    
    requestAnimationFrame(function () {
        aniDrawSine(ctx, curTime, startX, width, height);
    });
}

function calcPointPos2(func, idx, maxPoints, xMinDomain, xMaxDomain, startX, width, startY, height)
{
    startX = startX % width;
    var xStartDomain = startX * (xMaxDomain - xMinDomain) / width + xMinDomain;
    var x = idx * (xMaxDomain - xMinDomain) / maxPoints + xStartDomain;
    var y = func(x);
    var xPos = width * idx / maxPoints;
    var yPos = y * height + startY;
    return { xPos: xPos, yPos: yPos };
}